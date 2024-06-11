import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import {
  SeizureDto,
  SeizureInformationDto,
  SaveSeizureDto,
} from '../dtos/seizure-data.dto';
import { SeizureDataService } from '../services/seizure-data.service';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/role.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

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
  @Roles(Role.Admin)
  @HttpCode(HttpStatus.OK)
  @ApiQuery({ name: 'patientName', required: false })
  @Get()
  async getAllSeizures(
    @Query('patientName') patientName?: string,
  ): Promise<SeizureDto[]> {
    if (patientName) {
      return await this.seizureDataService.findAllRegisters(patientName);
    } else {
      return await this.seizureDataService.findAllRegisters();
    }
  }
}
