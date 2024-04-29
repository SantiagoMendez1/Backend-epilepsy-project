class InformationSeizureDto {
  valueBpm: number;
  valueMotion: number;
  registerAt: Date;
  location: string;
}

export class CreateRegisterSeizureDto {
  pacientName: string;
  dataValues: InformationSeizureDto;
}

export class GetRegisterSeizureDto extends CreateRegisterSeizureDto {}
