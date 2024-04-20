import { Test, TestingModule } from '@nestjs/testing';
import { SmsAlertService } from './sms-alert.service';

describe('SmsAlertService', () => {
  let service: SmsAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmsAlertService],
    }).compile();

    service = module.get<SmsAlertService>(SmsAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
