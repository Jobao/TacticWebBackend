import { Module } from '@nestjs/common';
import { MongodbService } from './mongodb.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Game, GameSchema } from 'src/game/schemas/game.schema';
import { User, UserSchema } from 'src/user/user.schema';
import { Auth, AuthSchema } from 'src/auth/auth.schema';
import {
  ClassSkill,
  ClassSkillSchema,
} from 'src/skills/schema/classSkill.schema';
import {
  UnitClass,
  UnitClassSchema,
} from 'src/unit-clases/schema/unitClass.schema';
import { GameMongoRepository } from './repositories/gameMongoRepository';
import { UserMongoRepository } from './repositories/userMongoRepository';
import { UnitClassMongoRepository } from './repositories/unitClassMongoRepository';
import { AuthMongoRepository } from './repositories/authMongoRepository';
import { ClassSkillMongoRepository } from './repositories/classSkillRepository';
import { Item, ItemSchema } from 'src/item/schemas/item.schema';
import {
  UsableItem,
  UsableItemSchema,
} from 'src/item/schemas/usableItem.schema';
import {
  EquipableItem,
  EquipableItemSchema,
} from 'src/item/schemas/equipableItem.schema';
import { UsableItemRepository } from './repositories/items/usableItemRepository';
import { EquipableItemRepository } from './repositories/items/equipableItemRepository';
import { WeaponItemRepository } from './repositories/items/weaponItemRepository';
import { WeaponItem, WeaponItemSchema } from 'src/item/schemas/weaponItem.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: User.name, schema: UserSchema },
      { name: Auth.name, schema: AuthSchema },
      { name: ClassSkill.name, schema: ClassSkillSchema },
      { name: UnitClass.name, schema: UnitClassSchema },
      {
        name: Item.name,
        schema: ItemSchema,
        discriminators: [
          { name: UsableItem.name, schema: UsableItemSchema },
          { name: EquipableItem.name, schema: EquipableItemSchema },
          {name: WeaponItem.name, schema: WeaponItemSchema}
        ],
      },
    ]),
  ],
  providers: [
    MongodbService,
    GameMongoRepository,
    UserMongoRepository,
    UnitClassMongoRepository,
    AuthMongoRepository,
    ClassSkillMongoRepository,
    UsableItemRepository,
    EquipableItemRepository, 
    WeaponItemRepository
  ],
  exports: [
    MongooseModule,
    GameMongoRepository,
    UserMongoRepository,
    MongodbService,
    UnitClassMongoRepository,
    AuthMongoRepository,
    ClassSkillMongoRepository,
    UsableItemRepository,
    UsableItemRepository,
    EquipableItemRepository, 
    WeaponItemRepository
  ],
})
export class MongodbModule {}
