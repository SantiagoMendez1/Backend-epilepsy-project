import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { SeizureDto, SeizureInformationDto } from '../dtos/seizure-data.dto';
import { SeizureDataService } from '../services/seizure-data.service';

@Controller('seizure-data')
export class SeizureDataController {
  constructor(private seizureDataService: SeizureDataService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createSeizureLog(
    @Body() seizureDto: SeizureDto,
    @Request() req,
  ): Promise<SeizureDto> {
    return await this.seizureDataService.createRegister(seizureDto, req.user);
  }

  @Get('last')
  async getLastSeizure(@Request() req): Promise<SeizureInformationDto> {
    return await this.seizureDataService.findLastSeizure(req.user);
  }

  @Get()
  async getAllSeizures(): Promise<SeizureDto[]> {
    return await this.seizureDataService.findAllRegisters();
  }
}
