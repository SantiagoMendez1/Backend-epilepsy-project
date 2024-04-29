import { Test, TestingModule } from '@nestjs/testing';
import { SeizureDataController } from './seizure-data.controller';

describe('DataSeizureController', () => {
  let controller: SeizureDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SeizureDataController],
    }).compile();

    controller = module.get<SeizureDataController>(SeizureDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
