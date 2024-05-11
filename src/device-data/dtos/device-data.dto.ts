import { IsNumber, IsString } from 'class-validator';

export class DeviceDataDto {
  @IsNumber()
  valueBpm: number;
  @IsNumber()
  valueMotion: number;
  @IsString()
  location: string;
}
