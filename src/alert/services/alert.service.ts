import { Injectable, NotFoundException } from '@nestjs/common';
import { DataBluetoothDto } from 'src/data-bluetooth/dtos/data-bluetooth.dto';
import { SmsAlertService } from './sms-alert.service';
import { DashboardAlertService } from './dashboard-alert.service';

@Injectable()
export class AlertService {
  constructor(
    private smsAlertService: SmsAlertService,
    private dashboardAlertService: DashboardAlertService,
  ) {}
  detectSeizure(data: DataBluetoothDto) {
    const { valueBpm, valueMotion, hourData, location } = data;
    if (!data) {
      return {
        message: 'data dont sent',
      };
    }
    if (valueBpm >= 150 && valueMotion >= 80) {
      try {
        const responseSms = this.smsAlertService.sendAlertToContacts();
        const responsedashboard =
          this.dashboardAlertService.sendAlertToDashboard();
        console.log(responseSms, responsedashboard);
      } catch (error) {
        new NotFoundException(error);
      }
      const response = {
        message: 'the pacient is having a seizure',
        bpm: valueBpm,
        motion: valueMotion,
        hour: hourData,
        location: location,
      };
      return response;
    }
  }
}
