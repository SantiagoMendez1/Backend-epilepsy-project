import { Module } from '@nestjs/common';
import { AlertService } from './services/alert.service';

@Module({
  providers: [AlertService],
})
export class AlertModule {}
