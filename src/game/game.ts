import { User } from "src/user/user";
import { Board } from "./board";

export class Game{
    uuid: number;
    board: Board;

    users: User[];

    isEnd:boolean;
    isStart:boolean;

    owner:User;

    init(_owner: User){
        this.isEnd = false;
        this.isStart = false;
    }
}