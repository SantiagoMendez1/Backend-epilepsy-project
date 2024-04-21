import { Module } from '@nestjs/common';
import { DataDeviceController } from './controllers/data-device.controller';
import { AlertModule } from 'src/alert/alert.module';

@Module({
  controllers: [DataDeviceController],
  imports: [AlertModule],
})
export class DataDeviceModule {}
