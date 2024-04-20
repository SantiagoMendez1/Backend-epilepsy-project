import { Test, TestingModule } from '@nestjs/testing';
import { DashboardAlertService } from './dashboard-alert.service';

describe('DashboardAlertService', () => {
  let service: DashboardAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardAlertService],
    }).compile();

    service = module.get<DashboardAlertService>(DashboardAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
