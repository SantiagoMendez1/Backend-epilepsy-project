import { Test, TestingModule } from '@nestjs/testing';
import { DataSeizureService } from './data-seizure.service';

describe('DataSeizureService', () => {
  let service: DataSeizureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DataSeizureService],
    }).compile();

    service = module.get<DataSeizureService>(DataSeizureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
