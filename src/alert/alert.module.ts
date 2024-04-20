import { Module } from '@nestjs/common';
import { AlertService } from './services/alert.service';
import { SmsAlertService } from './services/sms-alert.service';
import { DashboardAlertService } from './services/dashboard-alert.service';

@Module({
  providers: [AlertService, SmsAlertService, DashboardAlertService],
  exports: [AlertService],
})
export class AlertModule {}
