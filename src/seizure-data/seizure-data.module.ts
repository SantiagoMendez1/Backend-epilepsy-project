import { Module } from '@nestjs/common';
import { SeizureDataController } from './controllers/seizure-data.controller';
import { SeizureDataService } from './services/seizure-data.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SeizureLogs, SeizureLogsSchema } from './schemas/seizure-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SeizureLogs.name, schema: SeizureLogsSchema },
    ]),
  ],
  controllers: [SeizureDataController],
  providers: [SeizureDataService],
})
export class SeizureDataModule {}
