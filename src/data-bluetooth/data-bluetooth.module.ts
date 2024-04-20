import { Module } from '@nestjs/common';
import { DataBluetoothController } from './controllers/data-bluetooth.controller';
import { AlertModule } from 'src/alert/alert.module';

@Module({
  controllers: [DataBluetoothController],
  imports: [AlertModule],
})
export class DataBluetoothModule {}
