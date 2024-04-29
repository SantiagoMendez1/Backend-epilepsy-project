import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DeviceDataDto } from '../dtos/device-data.dto';
import { AlertService } from 'src/alert/services/alert.service';

@Controller('device-data')
export class DeviceDataController {
  constructor(private alertService: AlertService) {}
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  receiveData(@Body() dataDeviceDto: DeviceDataDto) {
    return console.log(dataDeviceDto);
    //return this.alertService.detectSeizure(dataDeviceDto);
  }
}
