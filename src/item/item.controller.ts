import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemService } from './item.service';
import { UpdateItemDto } from './dto/update-item.dto';
import { Public } from 'src/auth/public.decorator';
import { CreateWeaponItemDTO } from './dto/createWeaponItem.dto';
import { CreateUsableItemDTO } from './dto/createUsableItem.dto';
import { CreateEquipableItemDTO } from './dto/createEquipableItem.dto';
import { EquipmentSlot } from 'src/game/schemas/enums';

@Public()
@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post('equipable')
  createEquipableItem(@Body() payload:CreateEquipableItemDTO) {
    return this.itemService.createEquipableItem(payload);
    //return this.itemService.createUsableItem(createItemDto);
  }

  @Post('weapon')
  createWeaponItem(@Body() payload:CreateWeaponItemDTO){
    return this.itemService.createWeaponItem(payload);
  }

  @Post('usable')
  createUsableItem(@Body() payload:CreateUsableItemDTO){
    return this.itemService.createUsableItem(payload);
  }

  @Get('/bySlot')
  async findAllBySlot(@Query('slot') payload:string){
    return await this.itemService.findAllItemBySlot(EquipmentSlot[payload]);

  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
