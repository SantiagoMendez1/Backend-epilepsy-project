import { Module } from '@nestjs/common';
import { DataSeizureController } from './controllers/data-seizure.controller';
import { DataSeizureService } from './services/data-seizure.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  RegistersSeizure,
  RegisterSeizureSchema,
} from './schemas/data-seizure.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RegistersSeizure.name, schema: RegisterSeizureSchema },
    ]),
  ],
  controllers: [DataSeizureController],
  providers: [DataSeizureService],
})
export class DataSeizureModule {}
