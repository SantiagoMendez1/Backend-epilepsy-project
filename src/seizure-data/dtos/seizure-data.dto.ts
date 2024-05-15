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
  @IsString()
  pacientName: string;
  @IsObject()
  dataValues: SeizureInformationDto[];
}

export class SaveSeizureDto {
  @IsString()
  pacientName: string;
  @IsNumber()
  valueBpm: number;
  @IsNumber()
  valueMotion: number;
  @IsString()
  registerAt: Date;
  @IsString()
  location: string;
}
