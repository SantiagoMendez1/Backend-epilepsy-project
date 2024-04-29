import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { SeizureDto, SeizureInformationDto } from '../dtos/seizure-data.dto';
import { SeizureDataService } from '../services/seizure-data.service';

@Controller('seizure-data')
export class SeizureDataController {
  constructor(private seizureDataService: SeizureDataService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createSeizureLog(@Body() seizureDto: SeizureDto): Promise<SeizureDto> {
    return await this.seizureDataService.createRegister(seizureDto);
  }

  @Get(':id')
  async getLastSeizure(@Param() id: string): Promise<SeizureInformationDto> {
    return await this.seizureDataService.findLastSeizure(id);
  }

  @Get()
  async getAllSeizures(): Promise<SeizureDto[]> {
    return await this.seizureDataService.findAllRegisters();
  }
}
