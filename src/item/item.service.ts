import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { CacheService } from 'src/game-cache/cache.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { CreateEquipableItemDTO } from './dto/createEquipableItem.dto';
import { CreateWeaponItemDTO } from './dto/createWeaponItem.dto';
import { v4 as uuidv4 } from 'uuid';
import { EquipmentOBJDto } from 'src/game/dto/equipmentOBJ.dto';
import { EquipmentIDDto } from 'src/game/dto/equipmentID.dto';
import { EquipmentSlot } from 'src/game/schemas/enums';

@Injectable()
export class ItemService {
  constructor(
    private cacheService:CacheService,
    private mongoService:MongodbService
  ) {
    this.loadAllItems();
  }

  async loadAllItems(){
    let equip = await this.mongoService.equipableItemRepository.findAll();
    equip.forEach(element => {
      this.cacheService.EquipableItemCache.setInCache(element._id, element);
    });
    let weapon = await this.mongoService.weaponItemRepository.findAll();
    weapon.forEach(element => {
      this.cacheService.WeaponItemCache.setInCache(element._id, element);
    });
    let usableItem = await this.mongoService.usableItemRepository.findAll();
    usableItem.forEach(element => {
      this.cacheService.UsableItemCache.setInCache(element._id, element);
    });
  }
  createUsableItem(payload: CreateItemDto) {
    /*let ite:UsableItem = new UsableItem();
    ite._id = '1';
    ite.description = "prueba";
    ite.name = "repollito";*/
    payload._id = uuidv4();
    return this.mongoService.usableItemRepository.create(payload);
  }
  createWeaponItem(payload:CreateWeaponItemDTO){
    /*let weap:WeaponItem = new WeaponItem();
    weap._id = "2";
    weap.description = "ARMA";
    weap.name="katana";
    weap.range = 1;
    weap.slot = EquipmentSlot.MAINHAND;*/
    payload._id = uuidv4();
    return this.mongoService.weaponItemRepository.create(payload);
  }

  createEquipableItem(payload:CreateEquipableItemDTO){
    payload._id = uuidv4();
    return this.mongoService.equipableItemRepository.create(payload);
  }

  async getAllItemsOnDTO(payload:EquipmentIDDto): Promise<EquipmentOBJDto>{
    let ret:EquipmentOBJDto = new EquipmentOBJDto;
    let res:boolean = false
    if(payload.head){
      ret.head = await this.cacheService.EquipableItemCache.getInCacheOrBD(payload.head);
      res =true;
    }
    if(payload.chest){
      ret.chest = await this.cacheService.EquipableItemCache.getInCacheOrBD(payload.chest);
      res =true;
    }
    if(payload.feet){
      ret.feet = await this.cacheService.EquipableItemCache.getInCacheOrBD(payload.feet);
      res =true;
    }
    if(payload.gloves){
      ret.gloves = await this.cacheService.EquipableItemCache.getInCacheOrBD(payload.gloves);
      res =true;
    }
    if(payload.mainHand){
      ret.mainHand = await this.cacheService.WeaponItemCache.getInCacheOrBD(payload.mainHand);
      res =true;
    }
    if(payload.secondHand){
      ret.secondHand = await this.cacheService.WeaponItemCache.getInCacheOrBD(payload.secondHand);
      res =true;
    }
    if(payload.amulet){
      ret.amulet = await this.cacheService.EquipableItemCache.getInCacheOrBD(payload.amulet);
      res =true;
    }
    if(res){
      return ret;
    }
    return null;
  }

  findAll() {
    return `This action returns all item`;
  }

  async findAllItemBySlot(slot:EquipmentSlot){
    if(slot == EquipmentSlot.MAINHAND || slot == EquipmentSlot.SECONDHAND){
      
      return await this.findAllWeaponItemBySlot(slot);
    }
    else{
      return await this.findAllEquipableItemBySlot(slot);
    }
  }

  async findAllEquipableItemBySlot(slot:EquipmentSlot){
    return this.mongoService.equipableItemRepository.getAllItemBySlot(slot);
  }

  async findAllWeaponItemBySlot(slot:EquipmentSlot){
    return this.mongoService.weaponItemRepository.getAllItemBySlot(slot);
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
