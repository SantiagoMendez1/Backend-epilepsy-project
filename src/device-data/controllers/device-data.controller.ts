import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { DeviceDataDto } from '../dtos/device-data.dto';
import { AlertService } from 'src/alert/services/alert.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Device data')
@Controller('device-data')
export class DeviceDataController {
  constructor(private alertService: AlertService) {}

  @ApiOperation({ summary: 'Simulates the sending of data from device' })
  @HttpCode(HttpStatus.ACCEPTED)
  @Post()
  async receiveData(@Body() dataDeviceDto: DeviceDataDto, @Request() req) {
    return await this.alertService.detectSeizure(dataDeviceDto, req.user);
  }
}
