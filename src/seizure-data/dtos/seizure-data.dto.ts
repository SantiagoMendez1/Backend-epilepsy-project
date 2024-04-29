import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

export class SeizureInformationDto {
  @IsNumber()
  valueBpm: number;
  @IsNumber()
  valueMotion: number;
  @IsDate()
  registerAt: Date;
  @IsString()
  location: string;
}

export class SeizureDto {
  @IsString()
  pacientName: string;
  @IsArray()
  dataValues: SeizureInformationDto[];
}
