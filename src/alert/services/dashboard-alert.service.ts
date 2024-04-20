import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardAlertService {
  async sendAlertToDashboard() {
    const smsSent = 'the alert message to contacts are sent';
    return smsSent;
  }
}
