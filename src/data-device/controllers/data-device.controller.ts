import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { DataDeviceDto } from '../dtos/data-device.dto';
import { AlertService } from 'src/alert/services/alert.service';

@Controller('data-device')
export class DataDeviceController {
  constructor(private alertService: AlertService) {}
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  receiveData(@Body() dataDeviceDto: DataDeviceDto) {
    return console.log(dataDeviceDto);
    //return this.alertService.detectSeizure(dataDeviceDto);
  }
}
