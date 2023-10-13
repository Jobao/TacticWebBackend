el metodo UnitMove y el UnitPlace son muyyyy parecdios 

Refactorizar las posibles acciones en un DTO

# Unit

Las units representan los personajes jugables.

#### Properties:
* _id
* Nombre
* Class_ID
* BattleStats
* BattleActions
* Equipament
  
#### Methods:

Un jugador puede tener muchas unidades.

Cada unidad tiene:
-una clase 
-healt
-Mp
-slots Equipamento
-Acciones:
--Move
--Item
--Attack
--Class Skills
--Wait


#### Clases

Cada clase tiene diferentes habilidades, que estan disposible segun el nivel de las mismas

Cada clase contiene:
* class_id
* nombre
* Lista Habilidades

#### Slots Equipamento

Los personajes tienen los siguientes slots para equiparse:
* Head
* Chest
* Gloves
* Feet
* Main Hand (Si no tiene nada equipado es un puño)
* Second Hand
* Amuletb

#### Equipamento

El equipamento cambia los atributos basicos del personaje.

* Equip_id
* Slot



# Clases

