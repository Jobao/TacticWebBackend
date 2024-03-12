import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { SignupDto } from 'src/auth/dto/signup.dto';
import { Public } from 'src/auth/public.decorator';
import { JoinGameDto } from 'src/game/dto/joinGame.dto';
import { PlaceUnitDto } from 'src/game/dto/placeUnit.dto';
import { GameService } from 'src/game/game.service';
import { UnitClass } from 'src/unit-clases/schema/unitClass.schema';
import { SkillsService } from 'src/skills/skills.service';
import { UnitClasesService } from 'src/unit-clases/unit-clases.service';
import { CreateUnitDto } from 'src/unit/dto/createUnit.dto';
import { User } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { Game } from 'src/game/schemas/game.schema';
import { CreateGameDto } from 'src/game/dto/createGame.dto';
import { randomInt } from 'crypto';
import { FAKENAME } from 'src/StaticJson/fakeData';
import { CacheService } from 'src/game-cache/cache.service';
import { EquipmentIDDto } from 'src/game/dto/equipmentID.dto';
import { ItemService } from 'src/item/item.service';
import { EquipmentSlot } from 'src/game/schemas/enums';
import { MongodbService } from 'src/mongodb/mongodb.service';
//const _ = require('lodash');
import { WeaponItem } from 'src/item/schemas/weaponItem.schema';
import { Item } from 'src/item/schemas/item.schema';
//import Prueba  from 'tactic-game-common/src/dto/prueba';
var _ = require('lodash');

@Public()
@Controller('admin')
export class AdminController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private gameService: GameService,
    private skillService: SkillsService,
    private unitClassService: UnitClasesService,
    private cacheService: CacheService,
    private itemService: ItemService,
    private mongodbService: MongodbService,
  ) {}

  @Post('/user')
  addNewUser(@Body() nUser: SignupDto) {
    this.authService.signup(nUser);
  }

  @Get('/user')
  getAllUser() {
    return this.userService.findAll();
  }

  @Post('/user/:id')
  updateUser(@Body() uUser: User) {
    return this.userService.update(uUser);
  }

  @Get('/games')
  @ApiOkResponse({
    description: 'All games',
    type: Game,
    isArray: true,
  })
  async getAllGames() {
    return await this.gameService.getAllGames();
  }

  @Get('/games/:id')
  getGame(@Param('id') game_uuid: string) {
    return this.gameService.getGame(game_uuid);
  }

  @Post('/games/leave')
  leaveGame(@Body() dto: JoinGameDto) {
    this.gameService.leaveGame(dto);
    //TODO:Quien es el encargado de abandonar la partida
    //return this.ga.s.getGame(game_uuid.id);
  }

  @Post('/user/:id/unit')
  placeUnit(@Param('id') user_uuid: any, @Body() payload: CreateUnitDto) {
    payload.user_uuid = user_uuid;
    this.userService.addNewUnit(payload);
  }

  @Post('skills')
  newSkill() {
    this.skillService.create();
  }

  @Post('class')
  async newClass(@Body() nunitClass: UnitClass) {
    await this.unitClassService.addNewClass(nunitClass);
  }

  @Get('class')
  async getAllClasses() {
    return await this.unitClassService.getAllClasses();
  }

  @Get('class/1')
  async getSupCase(@Body('user_uuid') user_uuid: string) {
    return await this.unitClassService.getPosiblesClasesUnit((await this.userService.findOne(user_uuid)).createdUnits[0].classExperience);
  }

  @Get('pruebas')
  async prueba(@Body() nnn) {
    //this.cacheService.CLEAN_CACHE();
  }

  @Post('autoinsert')
  async autoInsert() {
    this.cacheService.CLEAN_CACHE();
    await this.mongodbService.DONT_USE_DELETE_ALL_DOCUMENT_ON_MONGO();
    let idJugador1 = await this.authService.signup({
      user: 'joao',
      pass: '1234',
      displayName: 'Pastelito',
    });
    let idJugador2 = await this.authService.signup({
      user: 'carlos',
      pass: '1234',
      displayName: 'Cupcake',
    });
    //console.log(idJugador1);
    //console.log(idJugador2);

    if (idJugador1 && idJugador2) {
      await this.userService.addItemInventory(idJugador1.data._id, 5, '460593f8-cc6c-4b5d-bdce-9840e173b332');
      await this.userService.addItemInventory(idJugador1.data._id, 2, '0a745590-c20c-4c3a-8f01-0df385f3b361');

      let classNameList: UnitClass[] = [];
      classNameList = await this.unitClassService.getAllNameClass();
      if (classNameList.length === 0) {
        console.log('No hay clases');
      }
      //Salgo de todos los juegos
      let user1 = await this.cacheService.UserCache.getInCacheOrBD(idJugador1.data._id);

      await this.gameService.leaveAllGameUser(user1._id, await this.userService.leaveAllGames(user1));

      let user2 = await this.cacheService.UserCache.getInCacheOrBD(idJugador2.data._id);
      await this.gameService.leaveAllGameUser(user2._id, await this.userService.leaveAllGames(user2));
      //---------------------------------//
      //Remuevo todas las unidades
      this.userService.removeAllUnits(user1._id);
      this.userService.removeAllUnits(user2._id);
      //--------------------------------//
      //Creo las unidades
      let cUnit: CreateUnitDto = new CreateUnitDto();

      for (let index = 0; index < 3; index++) {
        //classNameList.length
        cUnit.class_id = classNameList[randomInt(0, this.cacheService.UnitClassCache.cache.size - 1)]._id;
        cUnit.name = FAKENAME[randomInt(0, FAKENAME.length - 1)].name;
        cUnit.user_uuid = user1._id;
        await this.userService.addNewUnit(cUnit);
      }

      for (let index = 0; index < 3; index++) {
        cUnit.class_id = classNameList[randomInt(0, this.cacheService.UnitClassCache.cache.size - 1)]._id;
        cUnit.name = FAKENAME[randomInt(0, FAKENAME.length - 1)].name;
        cUnit.user_uuid = user2._id;
        await this.userService.addNewUnit(cUnit);
      }
      //-----------------------------------//
      //Creo el juego
      let gDTO: CreateGameDto = new CreateGameDto();
      gDTO.user_uuid = user1._id;
      gDTO.maxUnits = 10;
      gDTO.minUnits = 1;
      gDTO.sizeY = 10;
      gDTO.sizeX = 10;
      let gId = (await this.gameService.createGame(gDTO))._id;
      await this.gameService.joinGame({ user_uuid: user2._id, game_uuid: gId });

      //Actualizo los usuarios
      user1 = await this.cacheService.UserCache.getInCacheOrBD(idJugador1.data._id);
      user2 = await this.cacheService.UserCache.getInCacheOrBD(idJugador2.data._id);

      let placeUnitDtos: PlaceUnitDto = new PlaceUnitDto();

      for (let index = 0; index < user1.createdUnits.length; index++) {
        const element = user1.createdUnits[index];
        placeUnitDtos.equipment = new EquipmentIDDto();

        placeUnitDtos.equipment.chest = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.CHEST))._id;
        placeUnitDtos.equipment.feet = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.FEET))._id;
        placeUnitDtos.equipment.gloves = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.GLOVES))._id;
        placeUnitDtos.equipment.head = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.HEAD))._id;
        placeUnitDtos.equipment.mainHand = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.MAINHAND))._id;
        placeUnitDtos.equipment.secondHand = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.SECONDHAND))._id;
        placeUnitDtos.equipment.amulet = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.AMULET))._id;

        placeUnitDtos.game_uuid = gId;
        placeUnitDtos.target = {
          x: randomInt(0, gDTO.sizeX),
          y: randomInt(0, gDTO.sizeY),
        };
        placeUnitDtos.unit_uuid = element._id;
        placeUnitDtos.user_uuid = user1._id;

        if (!(await this.gameService.placeUnit(placeUnitDtos))) {
          console.log('error on place unit (user 1)');
        }
      }

      for (let index = 0; index < user2.createdUnits.length; index++) {
        const element = user2.createdUnits[index];
        placeUnitDtos.equipment = new EquipmentIDDto();
        placeUnitDtos.game_uuid = gId;
        placeUnitDtos.target = {
          x: randomInt(0, gDTO.sizeX),
          y: randomInt(0, gDTO.sizeY),
        };
        placeUnitDtos.unit_uuid = element._id;
        placeUnitDtos.user_uuid = user2._id;

        placeUnitDtos.equipment.chest = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.CHEST))._id;
        placeUnitDtos.equipment.feet = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.FEET))._id;
        placeUnitDtos.equipment.gloves = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.GLOVES))._id;
        placeUnitDtos.equipment.head = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.HEAD))._id;
        placeUnitDtos.equipment.mainHand = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.MAINHAND))._id;
        placeUnitDtos.equipment.secondHand = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.SECONDHAND))._id;
        placeUnitDtos.equipment.amulet = _.sample(await this.itemService.findAllItemBySlot(EquipmentSlot.AMULET))._id;

        if (!(await this.gameService.placeUnit(placeUnitDtos))) {
          console.log('error on place unit (user 2)');
        }
      }
      this.gameService.startGame({ user_uuid: user1._id, game_uuid: gId });
      //let game = await this.cacheService.GameCache.getInCacheOrBD(gId);
      //this.gameService.controlRange(game.placedUnitList[0].gameUnit[0], game.placedUnitList[0].gameUnit[1])
    }
  }
}
