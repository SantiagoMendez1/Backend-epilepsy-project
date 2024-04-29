import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateRegisterSeizureDto } from '../dtos/data-seizure.dto';
import { DataSeizureService } from '../services/data-seizure.service';

@Controller('data-seizure')
export class DataSeizureController {
  constructor(private dataSeizureService: DataSeizureService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  async saveDataSeizure(
    @Body() createRegisterSeizureDto: CreateRegisterSeizureDto,
  ) {
    return await this.dataSeizureService.createRegister(
      createRegisterSeizureDto,
    );
  }

  @Get(':id')
  async getLastSeizure(@Param() id: string) {
    return await this.dataSeizureService.getLastSeizure(id);
  }
}
