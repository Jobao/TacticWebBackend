export enum TypeEffect {
  Damage = 'DAMAGE',
  Recover = 'RECOVER',
  Buff = 'BUFF',
  Debuff = 'DEBUFF',
}
export enum TypeAffect {
  Self = 'SELF',
  Target = 'TARGET',
  AOE = 'AOE',
}

export enum AttributesName {
  STAMINA = 'STAMINA',
  SPIRIT = 'SPIRIT',
  STRENGTH = 'STRENGTH',
  INTELLECT = 'INTELECT',
  AGILITY = 'AGILITY',
}

export enum StatsName { //'HP', 'MP', 'PA', 'MA', 'MPR', 'PHD', 'MD', 'DODGE', 'SPEED'
  HP = 'HP', //En base la stamina
  MP = 'MP', //En base al spirit
  PA = 'PA', //Physic Attack
  MA = 'MA', //Magical Attack
  MPRegen = 'MPR',
  PhysicDefense = 'PHD',
  MagicalDefence = 'MD',
  Dodge = 'DODGE',
  Speed = 'SPEED',
}

export enum GamePhase {
  DRAFT = 'DRAFT',
  INGAME = 'INGAME',
}

export enum EquipmentSlot { //'HEAD', 'CHEST', 'GLOVES', 'FEET', 'AMULET' --- 'MAINHAND', 'SECONDHAND'
  HEAD = 'HEAD',
  CHEST = 'CHEST',
  GLOVES = 'GLOVES',
  FEET = 'FEET',
  MAINHAND = 'MAINHAND',
  SECONDHAND = 'SECONDHAND',
  AMULET = 'AMULET',
  BOTH = 'BOTH_HANDS',
}

export enum WeaponType {
  SWORD = 'SWORD',
  DAGGER = 'DAGGER',
  STAFF = 'STAFF',
  BOOK = 'BOOK',
  ROD = 'ROD',
  SHIELD = 'SHIELD',
  LONG_SWORD = 'LONG_SWORD',
  BOW = 'BOW',
}
