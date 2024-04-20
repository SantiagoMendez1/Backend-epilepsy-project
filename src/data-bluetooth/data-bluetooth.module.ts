import { Module } from '@nestjs/common';
import { DataBluetoothController } from './controllers/data-bluetooth.controller';

@Module({
  controllers: [DataBluetoothController],
})
export class DataBluetoothModule {}
