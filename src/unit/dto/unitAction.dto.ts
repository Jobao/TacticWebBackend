export class UnitActionDto{
    game_uuid:string;
    user_uuid:string;
    unit_uuid:string;
    action:UnitAction;
    
}

class Target{
    x:number;
    y:number;
}

class UnitAction{
    action:string;
    target:Target;
}
