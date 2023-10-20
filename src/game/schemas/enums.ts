export enum TypeEffect {
    Damage = "DAMAGE",
    Recover = "RECOVER",
    Buff = "BUFF",
    Debuff = "DEBUFF"
}
export enum TypeAffect {
    Self,
    Target,
    AOE
}

export enum AttributesName{
    STAMINA = "STAMINA",
    SPIRIT= "SPIRIT",
    STRENGTH = "STRENGTH",
    INTELLECT = "INTELECT",
    AGILITY = "AGILITY"
}

export enum StatsName{
    HP = "HP",//En base la stamina
    MP = "MP",//En base al spirit
    PA = "PA",//Physic Attack
    MA = "MA",//Magical Attack
    MPRegen = "MPR",
    PhysicDefense= "PHD",
    MagicalDefence="MD",
    Dodge = "DODGE",
    Speed = "SPEED"

}

export enum GamePhase{
    DRAFT = "DRAFT",
    INGAME = "INGAME"
}

export enum EquipmentSlot{
    HEAD= "HEAD",
    CHEST="CHEST",
    GLOVES= "GLOVES",
    FEET="FEET",
    MAINHAND= "MAINHAND",
    SECONDHAND = "SECONDHAND",
    AMULET = "AMULET"
}
