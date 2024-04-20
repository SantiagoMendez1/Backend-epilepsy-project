import { Body, Controller, Post } from '@nestjs/common';
import { DataBluetoothDto } from '../dtos/data-bluetooth.dto';
import { AlertService } from 'src/alert/services/alert.service';

@Controller('data-bluetooth')
export class DataBluetoothController {
  constructor(private alertService: AlertService) {}
  @Post()
  receiveData(@Body() dataBluetoothDto: DataBluetoothDto) {
    return this.alertService.detectSeizure(dataBluetoothDto);
  }
}
