import { Injectable } from '@nestjs/common';
import { Game } from './schemas/game.schema';
import { CreateGameDto } from './dto/createGame.dto';
import { v4 as uuidv4 } from 'uuid';
import { JoinGameDto } from './dto/joinGame.dto';
import { PlaceUnitDto } from './dto/placeUnit.dto';
import { UnitActionDto } from 'src/unit/dto/unitAction.dto';
import { CacheService } from 'src/game-cache/cache.service';
import { MongodbService } from 'src/mongodb/mongodb.service';

@Injectable()
export class GameService {
  constructor(
    private cacheService:CacheService,
    private mongoService:MongodbService
  ) {}

  async createGame(cGame: CreateGameDto) {

    let user =await this.cacheService.UserCache.getInCacheOrBD(cGame.user_uuid);
    
    if (user) {
      let game:Game = new Game();
        game._id = uuidv4();
        game.owner_uuid = cGame.user_uuid;
        game.isStart = false;
        game.isEnd = false;
        
        game.placedUnitList = [];
        if(!cGame.minUnits){
          game.minUnits = 1;
        } else{
          game.minUnits = cGame.minUnits;
        }
        if(!cGame.maxUnits){
          game.maxUnits = 6;
        } else{
          game.maxUnits = cGame.maxUnits;
        }
        //FIXME: Aca hay que obtener los datos del dto
        game.sizeX = 10;
        game.sizeY = 10
        //FIXME: Ver porque gamephase me da error, aca le asigno un valor magico
        game.gamePhase = 0;
        game.joinGame(cGame.user_uuid);
        user.joinGame(game._id);
        
        
        this.cacheService.GameCache.setInCache(game._id,await this.mongoService.gameRepository.create(game));
        this.cacheService.UserCache.setInCache(user._id,await this.mongoService.userRepository.update(user._id,user));
    }
  }

  async joinGame(jGame: JoinGameDto) {
    let user = await this.cacheService.UserCache.getInCacheOrBD(jGame.user_uuid);
    let game = await this.cacheService.GameCache.getInCacheOrBD(jGame.game_uuid);

    if (game && user) {
      if (!game.isEnd && !game.isStart) {
        if (game.joinGame(user._id)) {
          user.joinGame(game._id);
          
          this.cacheService.GameCache.setInCache(game._id,await this.mongoService.gameRepository.update(game._id, game));
          this.cacheService.UserCache.setInCache(user._id,await this.mongoService.userRepository.update(user._id,user));
        } else {
          console.log('Ya estoy');
        }
      } else {
        console.log('Juego ya en curso o finalizado');
      }
    } else {
      console.log('Inexistent game or user');
    }
  }
  
  async leaveGame(lGame: JoinGameDto) {
    let game = await this.cacheService.GameCache.getInCacheOrBD(lGame.game_uuid);
    
   if (game) {
     if (game.getUserIndexOnPlacedUnitList(lGame.user_uuid) !== -1){//Si no aparezco aca no hago nada directamente
      if (!game.isEnd) {
        if (!game.isStart) {
         let user = await this.cacheService.UserCache.getInCacheOrBD(lGame.user_uuid);
         if (user) {
           let remainUsers = game.leaveGame(lGame.user_uuid);
           user.leaveGame(game._id);
           this.cacheService.UserCache.setInCache(user._id,await this.mongoService.userRepository.update(user._id,user));
           if(remainUsers === 0){//si no queda nadie
             this.cacheService.GameCache.removeInCache((await this.mongoService.gameRepository.remove(game._id)).id)
             //this.cacheService.removeGameInCache((await this.mongoService.removeGame(game))._id);
           }
           else{
             this.cacheService.GameCache.setInCache(game._id,await this.mongoService.gameRepository.update(game._id, game));
           }
         }
        } else {
          //Finalizar
        }
      }
     }
   }
  }

//TODO: Se podria implementar un sistema de votacion para iniciar el juego
  async startGame(sGame: CreateGameDto) {
    let game = await this.cacheService.GameCache.getInCacheOrBD(sGame.game_uuid);
    if (game) {
      if (!game.isStart) {//Me aseguro que solo se puede iniciar una vez el juego
        if (game.placedUnitList.length >= 2) {
          game.isStart = true;
          game.turn = game.owner_uuid; //Le asigno el turno al owner
          game.gamePhase = 1; //Momento de poner unidades
          this.cacheService.GameCache.setInCache(game._id,await this.mongoService.gameRepository.update(game._id, game));
        } else {
          console.log('Por ahora no se puede jugar solo :(');
        }
      } else {
        console.log('juego ya iniciado');
      }
      } else{
        console.log('no existe el juego');
      }
  }

  async placeUnit(placeUnit: PlaceUnitDto) {
    let user = await this.cacheService.UserCache.getInCacheOrBD(placeUnit.user_uuid);
    if (user) {
      let unit = user.getUnit(placeUnit.unit_uuid);
      if(unit){
        let game = await this.cacheService.GameCache.getInCacheOrBD(placeUnit.game_uuid);
        if (game) {
          //El juego existe
          if (game.canPlaceMoreUnit(user._id)) {
            if (game.gamePhase === 0 && !game.isStart && !game.isEnd) {
              //Estoy en fase, no empezo y no termino
              if (game.isInsideBoard(placeUnit.pos[0], placeUnit.pos[1])) {
                //Esta dentro del tablero
                if (!game.isOcupiedByAnotherUnit(placeUnit.pos[0], placeUnit.pos[1])) {
                  //No esta ocupado por otra pieza
                  if (!game.isThisUnitPlace(placeUnit.unit_uuid, placeUnit.user_uuid)) {
                      //TODO: cambiar los parametros, enviar la unidad directamente
                      if (game.placeNewUnit(placeUnit.user_uuid, placeUnit.unit_uuid,placeUnit.pos[0],placeUnit.pos[1], unit.currentHP, unit.currentMP)) {
                        this.cacheService.GameCache.setInCache(game._id,await this.mongoService.gameRepository.update(game._id, game));
                      }
                      else{
                        console.log("la unidad no se pudo colocar (BD)");
                      }
                  }
                  else{
                      console.log("Unidad ya colocada");
                  }
                }
                else{
                  console.log("Lugar ocupado");
                }
              }
              else{
                  console.log("Fuera del tablero");
              }
            } else {
              console.log('El juego no esta iniciado');
            }
          }
        }
      }
    }
  }

  /**
   * Controla todas las posibles acciones que puede hacer una unidad
   * @param payload 
   * @returns 
   */
  async actionUnit(payload:UnitActionDto)//TODO:Falta controlar que el juego este iniciado
  {
    let game = await this.cacheService.GameCache.getInCacheOrBD(payload.game_uuid);
    if (game) {
      if (game.getUserIndexOnPlacedUnitList(payload.user_uuid) !== -1) {//Existo en este juego
        if (game.isMyTurn(payload.user_uuid)) {
          let user = (await this.cacheService.UserCache.getInCacheOrBD(payload.user_uuid));
          if (user) {
            let placedUnit = game.getUnit(user._id, payload.unit_uuid);
            if (placedUnit) {
              if (placedUnit.canPerformActionThisTurn) {
                let update = false;
                switch (payload.action.type) {
                  case "WAIT":
                    placedUnit.wait();
                    update = true;
                    break;
                  case "MOVE":
                    if (placedUnit.canMove) {
                      if(game.isInsideBoard(payload.action.target.x,payload.action.target.y)){
                        if(!game.isOcupiedByAnotherUnit(payload.action.target.x,payload.action.target.y)){
                          if (placedUnit.move(payload.action.target.x,payload.action.target.y)) {
                            update = true;
                            }
                          }
                        }
                      }
                    break;
                  default:
                    break;
                  }
                if (update) {
                  this.cacheService.GameCache.setInCache(game._id,await this.mongoService.gameRepository.update(game._id, game)); 
                }              
              }
            }
          }
        }
      }
    }
  }

  async getGame(game_uuid:string){
    //let game = await this.cacheService.gameInCache(game_uuid);
    let game = await this.cacheService.GameCache.getInCacheOrBD(game_uuid);
    if(game){
      return game;
    }
    else{
       return 'inexistent game';
       
    }
  }

  async getAllGames(){
    return await this.mongoService.gameRepository.findAll();
  }
}
