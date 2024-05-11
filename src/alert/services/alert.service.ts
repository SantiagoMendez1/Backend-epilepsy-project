import { Injectable, NotFoundException } from '@nestjs/common';
import { SmsAlertService } from './sms-alert.service';
import { DashboardAlertService } from './dashboard-alert.service';
import { UserService } from 'src/user/services/user.service';
import { DeviceData } from 'src/device-data/interfaces/device-data.interface';
import { UserReq } from 'src/user/interfaces/user-req.interface';

@Injectable()
export class AlertService {
  constructor(
    private smsAlertService: SmsAlertService,
    private dashboardAlertService: DashboardAlertService,
    private userService: UserService,
  ) {}

  async detectSeizure(deviceData: DeviceData, userReq: UserReq) {
    if (!deviceData) {
      return {
        message: 'data dont sent',
      };
    }
    const { valueBpm, valueMotion, date, location } = deviceData;
    const { userId, userName } = userReq;
    if (valueBpm >= 150 && valueMotion >= 80) {
      try {
        const contactsUser = await this.userService.findUserContacts(userId);
        console.log(contactsUser);
        const responseSms = this.smsAlertService.sendAlertToContacts(
          contactsUser,
          userName,
          location,
        );
        console.log(responseSms);
        //const responsedashboard =
        //  this.dashboardAlertService.sendAlertToDashboard();
        //.log(responseSms, responsedashboard);
      } catch (error) {
        new NotFoundException(error);
      }
      const response = {
        message: 'the pacient is having a seizure',
        bpm: valueBpm,
        motion: valueMotion,
        hour: date,
        location: location,
      };
      return response;
    }
  }
}
