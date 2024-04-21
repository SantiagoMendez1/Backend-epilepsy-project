import { Module } from '@nestjs/common';
import { DataSeizureController } from './controllers/data-seizure.controller';

@Module({
  controllers: [DataSeizureController]
})
export class DataSeizureModule {}
