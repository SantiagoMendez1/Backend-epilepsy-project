import { Test, TestingModule } from '@nestjs/testing';
import { DataSeizureController } from './data-seizure.controller';

describe('DataSeizureController', () => {
  let controller: DataSeizureController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataSeizureController],
    }).compile();

    controller = module.get<DataSeizureController>(DataSeizureController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
