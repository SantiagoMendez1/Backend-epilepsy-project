import { IsDate, IsNumber, IsObject, IsString } from 'class-validator';

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
  @IsObject()
  dataValues: SeizureInformationDto[];
}
