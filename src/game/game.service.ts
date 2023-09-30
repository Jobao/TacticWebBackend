import { Injectable } from '@nestjs/common';
import { Game, GameDocument, GameSchema } from './schemas/game.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGameDto } from './dto/createGame.dto';
import { v4 as uuidv4 } from 'uuid';
import { JoinGameDto } from './dto/joinGame.dto';
import { PlaceUnitDto } from './dto/placeUnit.dto';
import { UserService } from 'src/user/user.service';
import { UnitInfo } from './schemas/unitInfo.schema';
import { PlacedUnit } from './schemas/placedUnits.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel(Game.name) private gameModel: Model<GameDocument>,
    private userService: UserService,
  ) {}

  async createGame(cGame: CreateGameDto) {
    //TODO: El usuario puede tener mas de un juego ??????
    /*let gameRep = await this.gameModel.find({owner_uuid: cGame.user_uuid}).exec()
        if(gameRep){
        }*/
    let user = await this.userService.findOne(cGame.user_uuid);
    if (user) {
      if (user.createdUnits.length >= 3) {
        await this.gameModel.create({
          _id: uuidv4(),
          owner_uuid: cGame.user_uuid,
          isStart: false,
          isEnd: false,
          users_uuid: [cGame.user_uuid],
          gamePhase: 3,
        });
        //TODO: Ver porque gamephase me da error, aca le asigno un valor magico
      } else {
        console.log('El jugador tiene que tener al menos tres personajes');
      }
    } else {
      console.log('No existe el jugador');
    }
  }

  async joinGame(sol: JoinGameDto) {
    let nUser = await this.userService.findOne(sol.user_uuid);
    let game = await this.gameModel.findById(sol.game_uuid);

    if (nUser?.createdUnits.length >= 3) {
      if (game) {
        if (!game.isEnd && !game.isStart) {
          if (game.users_uuid.indexOf(sol.user_uuid) === -1) {
            await this.gameModel
              .findByIdAndUpdate(game._id, {
                $push: { users_uuid: sol.user_uuid },
              })
              .exec();
          } else {
            console.log('Ya estoy');
          }
        } else {
          console.log('Juego ya en curso o finalizado');
        }
      } else {
        console.log('Inexistent game');
      }
    }
  }

  async leaveGame(lGame: CreateGameDto) {
    /*
     -Si la partida no empezo:
     --Si el que sale es owner -> se elimina la partida :? se retira el jugador
     -SINO (Ya empezo la partida):
     --Se finaliza la partida y avisa al otro jugador de su victoria
     */
    let game = await this.findGame(lGame.game_uuid);
    if (!game.isEnd) {
      if (!game.isStart) {
        if (lGame.user_uuid === game.owner_uuid) {
          //Si el que solicita salir es el owner
          await this.gameModel.findByIdAndRemove(lGame.game_uuid).exec();
          //aca se deberia avisar al otro jugador.
        } else {
          //elimino el otro jugador
          await this.gameModel
            .findByIdAndUpdate(lGame.game_uuid, {
              $pull: { users_uuid: lGame.user_uuid },
            })
            .exec();
        }
      } else {
        //Finalizar
      }
    }
  }

  async findGame(uuid: string) {
    return await this.gameModel.findById(uuid).exec();
  }
  //Solo el owner deberia empezar
  async startGame(sGame: CreateGameDto) {
    let game = await this.findGame(sGame.game_uuid);
    if (game) {
      if (game.users_uuid.length >= 2) {
        //TODO: que pasa si quiero hacer las partidas para mas de 2
        if (game.owner_uuid === sGame.user_uuid) {
          game.isStart = true;
          game.users_uuid.forEach((element) => {
            //Inicializo el array de las unidades
            let place: PlacedUnit; //Esto porque no me dejaba hacer ...push({element.uuid ....}) directamente
            place.user_uuid = element;
            place.unitInfo = [];
            game.placedUnitList.push(place);
          });
          game.turn = game.owner_uuid; //Le asigno el turno al owner
          game.gamePhase = 0; //Momento de poner unidades
          await this.gameModel.findByIdAndUpdate(game._id, game).exec();
        } else {
          console.log('no sos el owner');
        }
      } else {
        console.log('Por ahora no se puede jugar solo :(');
      }
    } else {
      console.log('no existe el juego');
    }
  }

  async placeUnit(placeUnit: PlaceUnitDto) {
    if (await this.userService.isMyUnit(placeUnit.user_uuid, placeUnit.unit_uuid)) {
        let game = await this.findGame(placeUnit.game_uuid);
        if (game) {
          //El juego existe
          if (game.gamePhase === 0 && game.isStart && !game.isEnd) {
            //Estoy en fase, empezo y no termino
            if (game.isInsideBoard(placeUnit.pos[0], placeUnit.pos[1])) {
                console.log('Adentro del tablero');
              //Esta dentro del tablero
              if (!game.isOcupiedByAnotherUnit(placeUnit.pos[0], placeUnit.pos[1])) {
                //No esta ocupado por otra pieza
                console.log('no ocupado')
                if (!game.isThisUnitPlace(placeUnit.unit_uuid, placeUnit.user_uuid)) {
                    console.log('unidad no se encuentra en el tablero');
                    
                    if (game.placeNewUnit(placeUnit.user_uuid, placeUnit.unit_uuid,placeUnit.pos[0],placeUnit.pos[1])) {
                      await this.gameModel.findByIdAndUpdate(game._id, game).exec();
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
    else{
        console.log("User or Unit ID incorrect");
    }
  }

  async initGame(){

  }
}
