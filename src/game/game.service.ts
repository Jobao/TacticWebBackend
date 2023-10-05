import { Injectable } from '@nestjs/common';
import { Game } from './schemas/game.schema';
import { CreateGameDto } from './dto/createGame.dto';
import { v4 as uuidv4 } from 'uuid';
import { JoinGameDto } from './dto/joinGame.dto';
import { PlaceUnitDto } from './dto/placeUnit.dto';
import { PlacedUnit } from './schemas/placedUnits.schema';
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

    let user =await this.cacheService.userInCache(cGame.user_uuid);
    
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
        //FIXME: Ver porque gamephase me da error, aca le asigno un valor magico
        game.gamePhase = 0;
        game.joinGame(cGame.user_uuid);
        user.joinGame(game._id);
        this.cacheService.setGameInCache(await this.mongoService.createGame(game));
        this.cacheService.setUserInCache(await this.mongoService.updateUser(user));
    }
  }

  async joinGame(jGame: JoinGameDto) {
    let nUser = await this.cacheService.userInCache(jGame.user_uuid);
    let game = await this.cacheService.gameInCache(jGame.game_uuid);

    if (game && nUser) {
      if (!game.isEnd && !game.isStart) {
        if (game.joinGame(nUser._id)) {
          nUser.joinGame(game._id);
          this.cacheService.setGameInCache(await this.mongoService.updateGame(game));
          this.cacheService.setUserInCache(await this.mongoService.updateUser(nUser));
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

  async leaveGame(lGame: CreateGameDto) {
    /*
     -Si la partida no empezo:
     --Si el que sale es owner -> se elimina la partida :? se retira el jugador
     -SINO (Ya empezo la partida):
     --Se finaliza la partida y avisa al otro jugador de su victoria
     */
    let game = await this.cacheService.gameInCache(lGame.game_uuid);
    
   if (game) {
     if (!game.isEnd) {
       if (!game.isStart) {
        let remainUsers = game.leaveGame(lGame.user_uuid);
        let user = await this.cacheService.userInCache(lGame.user_uuid);
        user.leaveGame(game._id);
        this.cacheService.setUserInCache(await this.mongoService.updateUser(user));
        if(remainUsers === 0){//si no queda nadie
          this.cacheService.removeGameInCache((await this.mongoService.removeGame(game))._id);
        }
        else{
          this.cacheService.setGameInCache(await this.mongoService.updateGame(game));
        }
       } else {
         //Finalizar
       }
     }
   }
  }


  //Solo el owner deberia empezar
  async startGame(sGame: CreateGameDto) {
    let game = await this.cacheService.gameInCache(sGame.game_uuid);
    if (game) {
      if (!game.isStart) {//Me aseguro que solo se puede iniciar una vez el juego
        if (game.placedUnitList .length >= 2) {
          if (game.isOwner(sGame.user_uuid)) {
            game.isStart = true;
            game.turn = game.owner_uuid; //Le asigno el turno al owner
            game.gamePhase = 1; //Momento de poner unidades
            this.cacheService.setGameInCache(await this.mongoService.updateGame(game));
          } else {
            console.log('no sos el owner');
          }
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
    let user = await this.cacheService.userInCache(placeUnit.user_uuid);
    if (user) {
      let unit = user.getUnit(placeUnit.unit_uuid);
      if(unit){
        let game = await this.cacheService.gameInCache(placeUnit.game_uuid);
        if (game) {
          //El juego existe
          if (game.gamePhase === 0 && !game.isStart && !game.isEnd) {
            //Estoy en fase, no empezo y no termino
            if (game.isInsideBoard(placeUnit.pos[0], placeUnit.pos[1])) {
                console.log('Adentro del tablero');
              //Esta dentro del tablero
              if (!game.isOcupiedByAnotherUnit(placeUnit.pos[0], placeUnit.pos[1])) {
                //No esta ocupado por otra pieza
                console.log('no ocupado')
                if (!game.isThisUnitPlace(placeUnit.unit_uuid, placeUnit.user_uuid)) {
                    console.log('unidad no se encuentra en el tablero');
                    //TODO: cambiar los parametros, enviar la unidad directamente
                    if (game.placeNewUnit(placeUnit.user_uuid, placeUnit.unit_uuid,placeUnit.pos[0],placeUnit.pos[1], unit.HP, unit.MP)) {
                      this.cacheService.setGameInCache(await this.mongoService.updateGame(game));
                      console.log('place');
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

  async initGame(payload:CreateGameDto){
    let game = await this.cacheService.gameInCache(payload.game_uuid);
    if(game){
        if(game.owner_uuid === payload.user_uuid){
            game.gamePhase = 1;
            this.cacheService.setGameInCache(await this.mongoService.updateGame(game));
            //await this.gameModel.findByIdAndUpdate(game._id, game).exec();
        }else{
            console.log("No sos el owner");
        }
    }
    else{
        console.log("Juego inexistente");
        
    }

  }

  async moveUnit(placeUnit: PlaceUnitDto){
    let user = await this.cacheService.userInCache(placeUnit.user_uuid);
    if (user) {
      if(user.isMyUnit(placeUnit.unit_uuid)){
        let game = await this.cacheService.gameInCache(placeUnit.game_uuid);
        if (game) {
            //El juego existe
            if (game.gamePhase === 1 && game.isStart && !game.isEnd) {
              //Estoy en fase, empezo y no termino
              if (game.isInsideBoard(placeUnit.pos[0], placeUnit.pos[1])) {
                  console.log('Adentro del tablero');
                    //Esta dentro del tablero
                    if (!game.isOcupiedByAnotherUnit(placeUnit.pos[0], placeUnit.pos[1])) {
                        console.log("libre");
                        if(game.moveUnit(placeUnit.unit_uuid,placeUnit.user_uuid,placeUnit.pos[0],placeUnit.pos[1])){
                          this.cacheService.setGameInCache(await this.mongoService.updateGame(game));  
                          //await this.gameModel.findByIdAndUpdate(game._id, game).exec();
                            console.log('move');
                        }

                    }
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
  async actionUnit(payload:UnitActionDto)
  {
    let unit = (await this.cacheService.userInCache(payload.user_uuid)).getUnit(payload.unit_uuid);
    let game = await this.cacheService.gameInCache(payload.game_uuid);
    if (game) {
      if(unit){
        if(payload.action.action === "WAIT"){
          
          return;
        }
        //if(game.placedUnitList[0].unitInfo[0].)
        //TODO: Aca quede, es preguntar a la BD si la unidad es mia ?? Ya no le pregunte
        //cuando la agregue al tablero ?? Si controlo desde el placedUnit, seria casi lo mismo
      }
    }
    
  }
}
