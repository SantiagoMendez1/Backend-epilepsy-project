import { IsNumber, IsString } from 'class-validator';

export class DeviceDataDto {
  @IsNumber()
  valueBpm: number;
  @IsNumber()
  valueSo2: number;
  @IsString()
  location: string;
}
