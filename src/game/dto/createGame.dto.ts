export class CreateGameDto{
    /**
     * Id del que solicita
     */
    user_uuid: string;
    /**
     * id del juego
     */
    game_uuid: string;

    minUnits:number;

    maxUnits:number;

    sizeX:number;
    sizeY:number;
}