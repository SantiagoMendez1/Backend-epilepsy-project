import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  CreateSeizureLogDto,
  GetLogSeizureDto,
  GetSeizureInformationDto,
} from '../dtos/seizure-data.dto';
import { SeizureDataService } from '../services/seizure-data.service';

@Controller('seizure-data')
export class SeizureDataController {
  constructor(private seizureDataService: SeizureDataService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async saveDataSeizure(
    @Body() createRegisterSeizureDto: CreateSeizureLogDto,
  ): Promise<GetLogSeizureDto> {
    return await this.seizureDataService.createRegister(
      createRegisterSeizureDto,
    );
  }

  @Get(':id')
  async getLastSeizure(@Param() id: string): Promise<GetSeizureInformationDto> {
    return await this.seizureDataService.getLastSeizure(id);
  }

  @Get()
  async getSeizures(): Promise<GetLogSeizureDto[]> {
    return await this.seizureDataService.getRegisters();
  }
}
