import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UnitClasesService } from './unit-clases.service';
import { TupleClassExperience } from 'src/game/schemas/classExperience.schema';

@Controller('unit-clases')
export class UnitClasesController {
  constructor(private unitClassService: UnitClasesService) {}

  @Get('/initial')
  getInitialClasses() {
    return this.unitClassService.getPosiblesClassesIniciales();
  }

  @Get('')
  getAllClasses() {
    return this.unitClassService.getAllClasses();
  }

  @Post('/posibles')
  getAllPosiblesClasses(@Body() experience: TupleClassExperience[]) {
    return this.unitClassService.getPosiblesClasesUnit(experience);
    //Aca me quede, ver como pasar el unitUUid para recuperar las clases posibles
  }
}
