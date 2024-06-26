import { Module } from '@nestjs/common';
import { AlertModule } from './alert/alert.module';
import { DeviceDataModule } from './device-data/device-data.module';
import { SeizureDataModule } from './seizure-data/seizure-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { DashboardGateway } from './dashboard/dashboard.gateway';

@Module({
  imports: [
    AlertModule,
    DeviceDataModule,
    SeizureDataModule,
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: `mongodb+srv://${config.get<string>('MONGODB_USER')}:${config.get<string>('MONGODB_PASSWORD')}@${config.get<string>('MONGODB_HOST')}/${config.get<string>('MONGODB_DB')}`,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    DashboardGateway,
  ],
})
export class AppModule {}
