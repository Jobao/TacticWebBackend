import { Test, TestingModule } from '@nestjs/testing';
import { UnitClasesController } from './unit-clases.controller';

describe('UnitClasesController', () => {
  let controller: UnitClasesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitClasesController],
    }).compile();

    controller = module.get<UnitClasesController>(UnitClasesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
