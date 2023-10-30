import { Injectable } from '@nestjs/common';
import { Game } from './schemas/game.schema';
import { CreateGameDto } from './dto/createGame.dto';
import { v4 as uuidv4 } from 'uuid';
import { JoinGameDto } from './dto/joinGame.dto';
import { PlaceUnitDto } from './dto/placeUnit.dto';
import { UnitActionDto } from 'src/unit/dto/unitAction.dto';
import { CacheService } from 'src/game-cache/cache.service';
import { MongodbService } from 'src/mongodb/mongodb.service';
import { EquipmentSlot, GamePhase } from './schemas/enums';
import { GameANDUserDTO } from './dto/gameUser.dto';
import { ItemService } from 'src/item/item.service';
import { EquipmentOBJDto } from './dto/equipmentOBJ.dto';
import { GameUnit } from './schemas/gameUnit.schema';

@Injectable()
export class GameService {
  constructor(
    private cacheService:CacheService,
    private mongoService:MongodbService,
    private itemService:ItemService
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
        game.gamePhase = GamePhase.DRAFT;
        game.joinGame(cGame.user_uuid);
        user.joinGame(game._id);
        
        
        this.updateGame(game);
        //this.cacheService.GameCache.setInCache(game._id,await this.mongoService.gameRepository.create(game));
        this.cacheService.UserCache.setInCache(user._id,await this.mongoService.userRepository.update(user._id,user));
        return game;
    }
  }

  async updateGame(uGame:Game){
    this.cacheService.GameCache.setInCache(uGame._id,await this.mongoService.gameRepository.create(uGame));

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
  
  async leaveGame(lGame: GameANDUserDTO) {
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

  async leaveAllGameUser(user_uuid:string, allGames:string[]){
    allGames.forEach(async g => {
      let game = await this.cacheService.GameCache.getInCacheOrBD(g);
      if(game){
        if(game.leaveGame(user_uuid)){
          this.cacheService.GameCache.removeInCache((await this.mongoService.gameRepository.remove(game._id)).id)
        }
        else{
          this.updateGame(game);
        }
      }
    });
  }

//TODO: Se podria implementar un sistema de votacion para iniciar el juego
  async startGame(sGame: GameANDUserDTO) {
    let game = await this.cacheService.GameCache.getInCacheOrBD(sGame.game_uuid);
    if (game) {
      if (!game.isStart) {//Me aseguro que solo se puede iniciar una vez el juego
        if (game.placedUnitList.length >= 2) {
          //TODO:Tengo que ver que todos colocaron sus unidades
          game.isStart = true;
          game.turn = game.owner_uuid; //Le asigno el turno al owner
          game.gamePhase = GamePhase.INGAME; 
          //game.calculateUnitOrderAction();

          //TODO: Deberia el orden de las unidades
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

  async placeUnit(payload: PlaceUnitDto) {
    let user = await this.cacheService.UserCache.getInCacheOrBD(payload.user_uuid);
    if (user) {
      let unit = user.getUnit(payload.unit_uuid);
      if(unit){
        let game = await this.cacheService.GameCache.getInCacheOrBD(payload.game_uuid);
        if (game) {
          //El juego existe
          if (game.canPlaceMoreUnit(user._id)) {
            if (game.gamePhase === GamePhase.DRAFT && !game.isStart && !game.isEnd) {
              //Estoy en fase, no empezo y no termino
              if (game.isInsideBoard(payload.target)) {
                //Esta dentro del tablero
                if (!game.isOcupiedByAnotherUnit(payload.target)) {
                  //No esta ocupado por otra pieza
                  if (!game.isThisUnitPlace(payload.unit_uuid, payload.user_uuid)) {
                      //TODO: cambiar los parametros, enviar la unidad directamente
                      let equipment:EquipmentOBJDto;
                      if(payload.equipment){
                        equipment = await this.itemService.getAllItemsOnDTO(payload.equipment);
                        
                      }
                      if (game.placeNewUnit(payload.user_uuid, unit, payload.target, equipment)) {
                        this.cacheService.GameCache.setInCache(game._id,await this.mongoService.gameRepository.update(game._id, game));
                        return true;
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
          else{
            console.log("El juego no existe");
            
          }
        }
      }
    }
    return false;
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
      if (game.isStart) {
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
                        if(game.isInsideBoard(payload.action.target)){
                          if(!game.isOcupiedByAnotherUnit(payload.action.target)){
                            if (placedUnit.move(payload.action.target.x,payload.action.target.y)) {
                              update = true;
                              }
                            }
                          }
                        }
                      break;
                    case "ATTACK":
                      if(placedUnit.canAttack){
                        if(game.isInsideBoard(payload.action.target)){
                          let unitInPlace = game.isOcupiedByAnotherUnit(payload.action.target);
                          if(unitInPlace){
                            if (await this.controlRange(placedUnit, unitInPlace)) {
                              placedUnit.attack(unitInPlace);
                              update = true;
                            }
                            else{
                              console.log("muy lejos");
                              
                            }
                          }
                          else{
                            console.log("No hay nadie");
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
  }

  async controlRange(unit:GameUnit, attacked:GameUnit):Promise<boolean>{
    let distance = this.manhattanDistNOVECTOR(unit.posX, unit.posY, attacked.posX, attacked.posY);
    let range = 1//Default range
    if(unit.equipment.mainHand){
      let weapon = await this.cacheService.WeaponItemCache.getInCacheOrBD(unit.equipment.mainHand);
      if(weapon){
        range = weapon.range;
      }
      
    }
    console.log("RANGE: " + range);
    
    return range>=distance;
  }

  manhattanDistNOVECTOR(x1:number, y1:number, x2:number, y2:number) {//https://www.geeksforgeeks.org/calculate-the-manhattan-distance-between-two-cells-of-given-2d-array/
    let dist = Math.abs(x2 - x1) + Math.abs(y2 - y1);
    return dist;
}

  async getGame(game_uuid:string){
    let game = await this.cacheService.GameCache.getInCacheOrBD(game_uuid);
    if(game){
      return game;
    }
  }

  async getAllGames(){
    return (await this.mongoService.gameRepository.findAll());
  }

  async p(){
    return await this.itemService.findAllItemBySlot(EquipmentSlot.MAINHAND);
  }
}
