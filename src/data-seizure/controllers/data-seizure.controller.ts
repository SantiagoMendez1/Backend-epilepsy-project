import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateRegisterSeizureDto } from '../dtos/data-seizure.dto';

@Controller('data-seizure')
export class DataSeizureController {
  @HttpCode(HttpStatus.CREATED)
  @Post()
  saveDataSeizure(@Body() createRegisterSeizureDto: CreateRegisterSeizureDto) {
    console.log(createRegisterSeizureDto);
    return {
      message: 'data saved',
    };
  }
}
