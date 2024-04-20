import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlertModule } from './alert/alert.module';
import { DataBluetoothModule } from './data-bluetooth/data-bluetooth.module';
import { DataSeizureModule } from './data-seizure/data-seizure.module';

@Module({
  imports: [AlertModule, DataBluetoothModule, DataSeizureModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
