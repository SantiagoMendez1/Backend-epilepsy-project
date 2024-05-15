import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwilioService } from 'nestjs-twilio';
import { ContactUser } from 'src/user/interfaces/user.interface';

@Injectable()
export class SmsAlertService {
  constructor(
    private twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}
  sendAlertToContacts(
    contacts: ContactUser[],
    userName: string,
    location: string,
  ) {
    contacts.map(async (contact) => {
      try {
        return await this.twilioService.client.messages.create({
          body: `Hola ${contact.name}. El usuario ${userName} esta en peligro. Su ubicacion es: ${location}`,
          from: this.configService.get('TWILO_PHONE'),
          to: contact.numberPhone,
        });
      } catch (error) {
        new NotFoundException(error);
      }
    });
  }
}
