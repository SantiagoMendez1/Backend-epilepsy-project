import { Test, TestingModule } from '@nestjs/testing';
import { SeizureDataService } from './seizure-data.service';

describe('SeizureDataService', () => {
  let service: SeizureDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeizureDataService],
    }).compile();

    service = module.get<SeizureDataService>(SeizureDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
