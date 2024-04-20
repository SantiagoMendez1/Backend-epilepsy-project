import { IsNumber, IsString } from 'class-validator';

export class DataBluetoothDto {
  @IsNumber()
  valueBpm: number;
  @IsNumber()
  valueMotion: number;
  @IsString()
  hourData: string;
  @IsString()
  location: string;
}
