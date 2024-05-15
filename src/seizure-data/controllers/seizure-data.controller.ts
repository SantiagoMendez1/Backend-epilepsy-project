import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import {
  SeizureDto,
  SeizureInformationDto,
  SaveSeizureDto,
} from '../dtos/seizure-data.dto';
import { SeizureDataService } from '../services/seizure-data.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Seizure data')
@Controller('seizure-data')
export class SeizureDataController {
  constructor(private seizureDataService: SeizureDataService) {}

  @ApiOperation({ summary: 'Register a user seizure' })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createSeizureLog(
    @Body() saveSeizureDto: SaveSeizureDto,
  ): Promise<SeizureDto> {
    return await this.seizureDataService.createRegister(saveSeizureDto);
  }

  @ApiOperation({ summary: 'Last seizure of a user' })
  @HttpCode(HttpStatus.OK)
  @Get('last')
  async getLastSeizure(@Request() req): Promise<SeizureInformationDto> {
    return await this.seizureDataService.findLastSeizure(req.user);
  }

  @ApiOperation({ summary: 'List seizures of all users' })
  @HttpCode(HttpStatus.OK)
  @Get()
  async getAllSeizures(): Promise<SeizureDto[]> {
    return await this.seizureDataService.findAllRegisters();
  }
}
