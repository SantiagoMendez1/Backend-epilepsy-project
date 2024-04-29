import { Module } from '@nestjs/common';
import { DeviceDataController } from './controllers/device-data.controller';
import { AlertModule } from 'src/alert/alert.module';

@Module({
  controllers: [DeviceDataController],
  imports: [AlertModule],
})
export class DeviceDataModule {}
