import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertModule } from './alert/alert.module';
import { DeviceDataModule } from './device-data/device-data.module';
import { SeizureDataModule } from './seizure-data/seizure-data.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    AlertModule,
    DeviceDataModule,
    SeizureDataModule,
    MongooseModule.forRoot('mongodb://localhost:27017', {
      dbName: 'tesis-db-test',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
