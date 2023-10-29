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

@Public()
@Controller('admin')
export class AdminController {
    constructor(private userService:UserService, 
        private authService:AuthService, 
        private gameService:GameService,
        private skillService: SkillsService,
        private unitClassService: UnitClasesService,
        private cacheService:CacheService){}

    @Post('/user')
    addNewUser(@Body() nUser:SignupDto){
        this.authService.signup(nUser)
    }

    @Get('/user')
    getAllUser(){
        return this.userService.findAll();
    }

    @Post('/user/:id')
    updateUser(@Body() uUser:User){
        return this.userService.update(uUser);
    }

    @Get('/games')
    @ApiOkResponse({
        description:"All games",
        type:Game,
        isArray:true,
    })
    async getAllGames(){
        await this.gameService.p();
        return await this.gameService.getAllGames();
    }

    @Get('/games/:id')
    getGame(@Param('id') game_uuid:string){
        return this.gameService.getGame(game_uuid);
    }

    @Post('/games/leave')
    leaveGame(@Body() dto:JoinGameDto){
        this.gameService.leaveGame(dto);
        //TODO:Quien es el encargado de abandonar la partida
        //return this.ga.s.getGame(game_uuid.id);
    }

    @Post('/user/:id/unit')
    placeUnit(@Param('id') user_uuid:any, @Body() payload:CreateUnitDto){
        payload.user_uuid = user_uuid;
        this.userService.addNewUnit(payload);
    }

    @Post('skills')
    newSkill(){
        this.skillService.create();
    }

    @Post('class')
    async newClass(@Body() nunitClass:UnitClass){
        await this.unitClassService.addNewClass(nunitClass);
    }

    @Get('class')
    async getAllClasses(){
        return await this.unitClassService.getAllClasses();
    }

    @Get('class/1')
    async getSupCase(@Body('user_uuid') user_uuid:string){
        return await this.unitClassService.getPosiblesClasesUnit((await this.userService.findOne(user_uuid)).createdUnits[0]);
    }

    @Put('pruebas')
    async prueba(){
        await this.unitClassService.getAllNameClass();
    }

    @Post('autoinsert')
    async autoInsert(){
        let classNameList:UnitClass[] = [];
        classNameList = await this.unitClassService.getAllNameClass();
        //Salgo de todos los juegos
        let user1 = await this.cacheService.UserCache.getInCacheOrBD('ddbdddd0-1fdf-42c2-978a-6989c2767443');
        await this.gameService.leaveAllGameUser(user1._id, await this.userService.leaveAllGames(user1));
        
        let user2 =  await this.cacheService.UserCache.getInCacheOrBD('cdca6c1a-7c41-4773-bef0-c2bf2d01ea59');
        await this.gameService.leaveAllGameUser(user2._id, await this.userService.leaveAllGames(user2));
        //---------------------------------//
        //Remuevo todas las unidades
        this.userService.removeAllUnits(user1._id);
        this.userService.removeAllUnits(user2._id);
        //--------------------------------//
        //Creo las unidades
        let cUnit:CreateUnitDto = new CreateUnitDto();
        for (let index = 0; index < 3; index++) {//classNameList.length
            cUnit.class_id = classNameList[index]._id;
            cUnit.name = FAKENAME[randomInt(0, FAKENAME.length -1)].name;
            cUnit.user_uuid = user1._id;
            await this.userService.addNewUnit(cUnit)
        }

        for (let index = 0; index < 3; index++) {
            cUnit.class_id = classNameList[index]._id;
            cUnit.name = FAKENAME[randomInt(0, FAKENAME.length -1)].name;
            cUnit.user_uuid = user2._id;
            await this.userService.addNewUnit(cUnit)
        }
        //-----------------------------------//
        //Creo el juego
        let gDTO: CreateGameDto = new CreateGameDto();
        gDTO.user_uuid = user1._id;
        gDTO.maxUnits= 10;
        gDTO.minUnits = 1;
        gDTO.sizeY = 10;
        gDTO.sizeX = 10;
        let gId =(await this.gameService.createGame(gDTO))._id;
        await this.gameService.joinGame({user_uuid: user2._id, game_uuid: gId});

        //Actualizo los usuarios
        user1 = await this.cacheService.UserCache.getInCacheOrBD('ddbdddd0-1fdf-42c2-978a-6989c2767443');
        user2 = await this.cacheService.UserCache.getInCacheOrBD('cdca6c1a-7c41-4773-bef0-c2bf2d01ea59');
        
        let placeUnitDtos:PlaceUnitDto = new PlaceUnitDto();
        placeUnitDtos.equipment = new EquipmentIDDto();
        placeUnitDtos.equipment.head = "5cc34023-8dff-4e16-94be-cd1a46c2e2e1";
        for (let index = 0; index < user1.createdUnits.length; index++) {
            const element = user1.createdUnits[index];
            placeUnitDtos.game_uuid = gId;
            placeUnitDtos.target = {x:randomInt(0, gDTO.sizeX), y:randomInt(0, gDTO.sizeY)};
            placeUnitDtos.unit_uuid = element._id;
            placeUnitDtos.user_uuid = user1._id;
            if(!await this.gameService.placeUnit(placeUnitDtos)){
                console.log("error on place unit (user 1)");
            }
            placeUnitDtos.equipment = undefined;
        }

        for (let index = 0; index < user2.createdUnits.length; index++) {
            const element = user2.createdUnits[index];
            placeUnitDtos.game_uuid = gId;
            placeUnitDtos.target = {x:randomInt(0, gDTO.sizeX), y:randomInt(0, gDTO.sizeY)};
            placeUnitDtos.unit_uuid = element._id;
            placeUnitDtos.user_uuid = user2._id;
            if(!await this.gameService.placeUnit(placeUnitDtos)){
                console.log("error on place unit (user 2)");
            }
        }
        this.gameService.startGame({user_uuid:user1._id, game_uuid:gId});
    }

    



}