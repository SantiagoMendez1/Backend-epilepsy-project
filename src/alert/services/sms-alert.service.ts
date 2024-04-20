import { Injectable } from '@nestjs/common';

@Injectable()
export class SmsAlertService {
  async sendAlertToContacts() {
    const smsSent = 'the alert message to the contacts has been sent';
    return smsSent;
  }
}
