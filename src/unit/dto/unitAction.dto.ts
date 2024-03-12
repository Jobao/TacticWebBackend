import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID } from 'class-validator';
import { GameANDUserDTO } from 'src/game/dto/gameUser.dto';

export class Target {
  @IsNumber()
  @ApiProperty()
  x: number;
  @IsNumber()
  @ApiProperty()
  y: number;
}

export class UnitAction {
  @ApiProperty()
  type: string;
  @ApiProperty({ type: () => Target })
  target: Target;
}

export class UnitActionDto extends GameANDUserDTO {
  @IsUUID('4')
  unit_uuid: string;
  @ApiProperty({ type: () => UnitAction })
  action: UnitAction;
}
