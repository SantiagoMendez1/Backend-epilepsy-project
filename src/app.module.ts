import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertModule } from './alert/alert.module';
import { DataDeviceModule } from './data-device/data-device.module';
import { DataSeizureModule } from './data-seizure/data-seizure.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AlertModule,
    DataDeviceModule,
    DataSeizureModule,
    MongooseModule.forRoot('mongodb://localhost:27017'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
