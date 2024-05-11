import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';
import { ContactUser } from 'src/user/interfaces/user.interface';

@Injectable()
export class SmsAlertService {
  constructor(
    private twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}
  async sendAlertToContacts(
    contacts: ContactUser[],
    userName: string,
    location: string,
  ) {
    for (let i = 0; i <= contacts.length; i++) {
      return this.twilioService.client.messages.create({
        body: `Hola ${contacts[i].name}. El usuario ${userName} esta en peligro. Su ubicacion es: ${location}`,
        from: this.configService.get('TWILO_PHONE'),
        to: contacts[i].numberPhone,
      });
    }
  }
}
