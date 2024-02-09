import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { CreateUserDto } from './dto/createUser.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateUnitDto } from 'src/unit/dto/createUnit.dto';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { CacheService } from 'src/game-cache/cache.service';
import { Unit } from 'src/game/schemas/unit.schema';
import { UnitClasesService } from 'src/unit-clases/unit-clases.service';
import { EquipmentIDDto } from 'src/game/dto/equipmentID.dto';
import { UnitEquiped } from 'src/game/schemas/unitEquiped.schema';
import UserInventory from './schema/userInventory.schema';
import { GetUserInventoryDTO } from './dto/getUserInventory.dto';
import { ItemService } from 'src/item/item.service';

@Injectable()
export class UserService {
  constructor(
    private mongoService: MongodbService,
    private cacheService: CacheService,
    private unitClassService: UnitClasesService,
    private itemService: ItemService,
  ) {}
  /**
   * NO llamar directamente de los controllers/gateway
   * Llamar auth.signup
   */
  async create(cUser: CreateUserDto) {
    let user = new User();
    user._id = cUser._id;
    user.user = cUser.user;
    user.displayName = cUser.displayName;
    user.inventory = new UserInventory();
    return await this.mongoService.userRepository.create(user);
  }

  async findAll() {
    return await this.mongoService.userRepository.findAll();
  }

  async findOne(user_uuid: string) {
    return await this.mongoService.userRepository.findOne(user_uuid);
  }

  async update(uUser: User) {
    return await this.mongoService.userRepository.update(uUser._id, uUser);
  }

  async addNewUnit(cUnity: CreateUnitDto) {
    let usr = await this.cacheService.UserCache.getInCacheOrBD(cUnity.user_uuid);
    if (usr) {
      let unit = new Unit();
      unit.classExperience = [];
      let uClass = this.unitClassService.canUseThisClass(cUnity.class_id, unit);
      if (uClass) {
        unit._id = uuidv4();
        unit.name = cUnity.name;
        unit.changeMainClass(uClass);
        unit.defaultEquipment = new UnitEquiped();
        usr.addUnit(unit);
        await this.cacheService.UserCache.setInCache(usr._id, await this.update(usr));
      } else {
        console.log('La clase seleccionada no es valida');
      }
    }
  }

  async removeUnit(user_uuid: string, unit_uuid: string) {
    let usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);
    if (usr) {
      usr.removeUnit(unit_uuid);
      await this.cacheService.UserCache.setInCache(usr._id, await this.update(usr));
    }
  }

  async removeAllUnits(user_uuid: string) {
    let usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);
    if (usr) {
      usr.createdUnits = [];
      await this.cacheService.UserCache.setInCache(usr._id, await this.update(usr));
    }
  }

  async leaveAllGames(usr: User) {
    let temp = usr.leaveAllGames();
    await this.cacheService.UserCache.setInCache(usr._id, await this.update(usr));
    return temp;
  }

  async getUnit(user_uuid: string, unit_uuid: string) {
    const usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);
    if (usr) {
      const unit = usr.getUnit(unit_uuid);
      if (unit) {
        return { status: 'OK', unit: unit };
      }
      return { status: 'FAIL' };
    }
    return { status: 'FAIL' };
  }

  async getAllUnits(user_uuid: string) {
    const usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);
    if (usr) {
      return usr.createdUnits;
    }
  }

  async unitChangeClass(payload: { unit_uuid: string; class_id: string }, user_uuid: string) {
    const usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);
    if (usr) {
      var unit = usr.getUnit(payload.unit_uuid);
      if (unit) {
        if (this.unitClassService.canUseThisClass(payload.class_id, unit)) {
          var res = unit.changeMainClass(await this.unitClassService.findOneClass(payload.class_id));
          if (res) {
            this.cacheService.UserCache.setInCache(usr._id, await this.update(usr));
          }
        }
      }
    }
  }

  async setDefaultEquipment(user_uuid: string, unit_uuid: string, equipmentDto: EquipmentIDDto) {
    const usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);
    if (usr) {
      var unit = usr.getUnit(unit_uuid);
      if (unit) {
        unit.defaultEquipment.equip(await this.cacheService.EquipableItemCache.getInCacheOrBD(equipmentDto.amulet));
        unit.defaultEquipment.equip(await this.cacheService.EquipableItemCache.getInCacheOrBD(equipmentDto.chest));
        unit.defaultEquipment.equip(await this.cacheService.EquipableItemCache.getInCacheOrBD(equipmentDto.feet));
        unit.defaultEquipment.equip(await this.cacheService.EquipableItemCache.getInCacheOrBD(equipmentDto.gloves));
        unit.defaultEquipment.equip(await this.cacheService.EquipableItemCache.getInCacheOrBD(equipmentDto.head));
        unit.defaultEquipment.equip(await this.cacheService.EquipableItemCache.getInCacheOrBD(equipmentDto.mainHand));
        unit.defaultEquipment.equip(await this.cacheService.EquipableItemCache.getInCacheOrBD(equipmentDto.secondHand));
      }
    }
  }

  async getInventory(user_uuid: string) {
    const usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);
    if (usr) {
      var ret = new GetUserInventoryDTO();
      usr.inventory.equipableInventory.forEach(async (element) => {
        ret.inventory.push({ amount: element.amount, item: await this.cacheService.EquipableItemCache.getInCacheOrBD(element.item_id) });
      });
      usr.inventory.weaponInventory.forEach(async (element) => {
        ret.inventory.push({ amount: element.amount, item: await this.cacheService.WeaponItemCache.getInCacheOrBD(element.item_id) });
      });
      return ret;
    }
    return undefined;
  }

  async addItemInventory(user_uuid: string, amount: number, item_uuid: string) {
    var update = false;
    var usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);

    var item;
    if (usr) {
      if (item_uuid !== '') {
        var tipo = await this.itemService.getTypeByID(item_uuid);
        if (tipo === 'EquipableItem') {
          item = await this.cacheService.EquipableItemCache.getInCacheOrBD(item_uuid);
          if (item) {
            var finded = usr.inventory.equipableInventory.findIndex((x) => {
              return x.item_id === item_uuid;
            });
            if (finded !== -1) {
              usr.inventory.equipableInventory[finded].amount += amount;
            } else {
              usr.inventory.equipableInventory.push({ amount: amount, item_id: item_uuid });
            }
            update = true;
          }
        } else {
          if (tipo === 'WeaponItem') {
            item = await this.cacheService.WeaponItemCache.getInCacheOrBD(item_uuid);
            var finded = usr.inventory.weaponInventory.findIndex((x) => {
              return x.item_id === item_uuid;
            });
            if (finded !== -1) {
              usr.inventory.weaponInventory[finded].amount += amount;
            } else {
              usr.inventory.weaponInventory.push({ amount: amount, item_id: item_uuid });
            }
            update = true;
            //console.log(usr.inventory.weaponInventory);
          }
        }
      }
      if (update) {
        this.cacheService.UserCache.setInCache(usr._id, await this.update(usr));
      }
    }
  }

  //TODO: Aca me quede con el
  async removeItemInventory(user_uuid: string, amount: number, item_uuid: string) {
    var update = false;
    var usr = await this.cacheService.UserCache.getInCacheOrBD(user_uuid);

    var item;
    if (usr) {
      if (item_uuid !== '') {
        var tipo = await this.itemService.getTypeByID(item_uuid);
        if (tipo === 'EquipableItem') {
          item = await this.cacheService.EquipableItemCache.getInCacheOrBD(item_uuid);
          if (item) {
            var finded = usr.inventory.equipableInventory.findIndex((x) => {
              return x.item_id === item_uuid;
            });
            if (finded !== -1) {
              usr.inventory.equipableInventory[finded].amount -= amount;
              if (usr.inventory.equipableInventory[finded].amount === 0) {
                usr.inventory.equipableInventory.splice(finded, 1);
              }
            }
          }
          update = true;
        } else {
          if (tipo === 'WeaponItem') {
            item = await this.cacheService.WeaponItemCache.getInCacheOrBD(item_uuid);
            var finded = usr.inventory.weaponInventory.findIndex((x) => {
              return x.item_id === item_uuid;
            });
            if (finded !== -1) {
              usr.inventory.weaponInventory[finded].amount -= amount;
              if (usr.inventory.weaponInventory[finded].amount === 0) {
                usr.inventory.weaponInventory.splice(finded, 1);
              }
            }
            update = true;
            //console.log(usr.inventory.weaponInventory);
          }
        }
      }
      if (update) {
        this.cacheService.UserCache.setInCache(usr._id, await this.update(usr));
      }
    }
  }
}
