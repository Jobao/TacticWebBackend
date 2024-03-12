export class CustomResponseType<T> {
  constructor() {
    this.status = '';
    this.reason = '';
    this.data = undefined;
  }
  status: string;
  reason: string;
  data: T;

  setOK(_data?: T) {
    if (_data) {
      this.data = _data;
    }
    this.status = 'OK';
  }

  setFAIL(_reason: string) {
    this.reason = _reason;
    this.status = 'FAIL';
  }
}

export interface ILoginResponse {
  access_token: string;
  user_uuid: string;
}

export enum FailsStrings {
  CANT_MOVE = 'La unidad no puede moverse',
  CANT_ATTACK = 'La unidad no puede atacar',
  SLOT_OCCUPIED = 'Existe una unidad en ese lugar',
  OUT_RANGE = 'Fuera de rango',
  OUTSIDE_BOARD = 'Posicion afuera del tablero',
  NO_TARGET = 'No se selecciono target',
  INEXISTENT_UNIT_IN_GAME = 'No existe la unidad en el juego seleccionado',
  INEXISTENT_USER = 'Usuario inexistente',
  INEXISTENT_GAME = 'Juego inexistente',
  NOT_YOU_TURN = 'No es tu turno',
  GAME_DONT_START = 'Juego no iniciado',
  INVALID_PASSWORD = 'Password invalido',
  CANT_CREATE_AUTH = 'No se puede crear el usuario (AUTH)',
  CANT_CREATE_USER = 'No se puede crear el usuario (USER)',
  DUPLICATE_USER = 'Ya existe ese nombre de usuario',
}
