import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './schemas/item.schema';
import { UsableItem } from './schemas/usableItem.schema';
import { CacheService } from 'src/game-cache/cache.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { WeaponItem } from './schemas/weaponItem.schema';
import { EquipableItem } from './schemas/equipableItem.schema';
import { EquipmentSlot } from 'src/game/schemas/enums';

@Injectable()
export class ItemService {
  constructor(
    private cacheService:CacheService,
    private mongoService:MongodbService
  ) {}
  createUsableItem(createItemDto: CreateItemDto) {
    let ite:UsableItem = new UsableItem();
    ite._id = '1';
    ite.description = "prueba";
    ite.name = "repollito";
    this.mongoService.usableItemRepository.create(ite);
    return 'This action adds a new item';
  }
  createWeaponItem(){
    let weap:WeaponItem = new WeaponItem();
    weap._id = "2";
    weap.description = "ARMA";
    weap.name="katana";
    weap.range = 1;
    weap.slot = EquipmentSlot.MAINHAND;
    this.mongoService.weaponItemRepository.create(weap);
  }

  createEquipableItem(){
    let equip:EquipableItem = new EquipableItem();
    equip._id = "3";
    equip.description = "CAbeza";
    equip.name="sombrero";
    equip.slot = EquipmentSlot.HEAD;
    this.mongoService.equipableItemRepository.create(equip);
  }

  findAll() {
    return `This action returns all item`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
