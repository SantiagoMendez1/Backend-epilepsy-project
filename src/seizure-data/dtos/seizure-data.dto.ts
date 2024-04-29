class SeizureInformationDto {
  valueBpm: number;
  valueMotion: number;
  registerAt: Date;
  location: string;
}

export class CreateSeizureLogDto {
  pacientName: string;
  dataValues: SeizureInformationDto;
}

export class GetLogSeizureDto extends CreateSeizureLogDto {}
