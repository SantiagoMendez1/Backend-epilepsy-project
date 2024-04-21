import { IsNumber, IsString } from 'class-validator';

export class DataDeviceDto {
  @IsNumber()
  valueBpm: number;
  @IsNumber()
  valueMotion: number;
  @IsString()
  date: Date;
  @IsString()
  location: string;
}
