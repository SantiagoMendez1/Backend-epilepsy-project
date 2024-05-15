import { Module } from '@nestjs/common';
import { AlertService } from './services/alert.service';
import { SmsAlertService } from './services/sms-alert.service';
import { UserModule } from 'src/user/user.module';
import { TwilioModule } from 'nestjs-twilio';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DashboardGateway } from 'src/dashboard/dashboard.gateway';

@Module({
  imports: [
    UserModule,
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        accountSid: config.get('TWILIO_ACCOUNT_SID'),
        authToken: config.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AlertService, SmsAlertService, DashboardGateway],
  exports: [AlertService],
})
export class AlertModule {}
