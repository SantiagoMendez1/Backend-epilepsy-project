import { Injectable, NotFoundException } from '@nestjs/common';
import { SmsAlertService } from './sms-alert.service';
import { UserService } from 'src/user/services/user.service';
import { DeviceData } from 'src/device-data/interfaces/device-data.interface';
import { UserReq } from 'src/user/interfaces/user-req.interface';
import { DashboardGateway } from 'src/dashboard/dashboard.gateway';

@Injectable()
export class AlertService {
  constructor(
    private smsAlertService: SmsAlertService,
    private userService: UserService,
    private dashboardGateway: DashboardGateway,
  ) {}

  async detectSeizure(deviceData: DeviceData, userReq: UserReq) {
    if (!deviceData) {
      return {
        message: 'data dont sent',
      };
    }
    const { valueBpm, valueMotion, location } = deviceData;
    const dateSeizure = Date.now();
    const { userId, userName } = userReq;
    if (valueBpm >= 150 && valueMotion >= 80) {
      try {
        const contactsUser = await this.userService.getUserContacts(userId);
        // this.smsAlertService.sendAlertToContacts(
        //   contactsUser,
        //   userName,
        //   location,
        // );
        const response = {
          name: userName,
          bpm: valueBpm,
          motion: valueMotion,
          date: dateSeizure,
          location: location,
        };
        this.dashboardGateway.sendAlertToDashboard(response);
      } catch (error) {
        new NotFoundException(error);
      }
    }
  }
}
