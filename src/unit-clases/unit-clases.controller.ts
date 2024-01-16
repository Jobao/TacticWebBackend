import { Controller, Get } from '@nestjs/common';
import { UnitClasesService } from './unit-clases.service';

@Controller('unit-clases')
export class UnitClasesController {
  constructor(private unitClassService: UnitClasesService) {}

  @Get('/initial')
  getInitialClasses() {
    return this.unitClassService.getPosiblesClassesIniciales();
  }
}
