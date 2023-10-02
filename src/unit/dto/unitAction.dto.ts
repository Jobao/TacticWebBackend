export class UnitActionDto{
    game_uuid:string;
    user_uuid:string;
    caster_uuid:string;
    action:string;
    target:Target
}

class Target{
    x:number;
    y:number;
}