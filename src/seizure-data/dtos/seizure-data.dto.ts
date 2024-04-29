import { IsArray, IsDate, IsNumber, IsString } from 'class-validator';

class SeizureInformationDto {
  @IsNumber()
  valueBpm: number;
  @IsNumber()
  valueMotion: number;
  @IsDate()
  registerAt: Date;
  @IsString()
  location: string;
}

export class CreateSeizureLogDto {
  @IsString()
  pacientName: string;
  @IsArray()
  dataValues: SeizureInformationDto[];
}

export class GetLogSeizureDto extends CreateSeizureLogDto {}

export class GetSeizureInformationDto extends SeizureInformationDto {}
