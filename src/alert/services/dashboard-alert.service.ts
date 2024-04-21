import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardAlertService {
  async sendAlertToDashboard() {
    const smsSent = 'the alert message to the dashboard has been sent';
    return smsSent;
  }
}
