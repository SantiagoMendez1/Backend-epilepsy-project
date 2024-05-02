import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertModule } from './alert/alert.module';
import { DeviceDataModule } from './device-data/device-data.module';
import { SeizureDataModule } from './seizure-data/seizure-data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development.local',
      isGlobal: true,
    }),
    AlertModule,
    DeviceDataModule,
    SeizureDataModule,
    // MongooseModule.forRoot(
    //   `mongodb:${process.env.DATABASE_HOST}//:${process.env.DATABASE_PORT}`,
    //   {
    //     dbName: process.env.DATABASE_NAME,
    //   },
    // ),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('DATABASE_URI'),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
