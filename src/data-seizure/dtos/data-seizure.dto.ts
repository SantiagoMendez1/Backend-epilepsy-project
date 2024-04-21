export class CreateRegisterSeizureDto {
  pacientName: string;
  dataValues: DataseizureDto[];
}

class DataseizureDto {
  valueBPM: number;
  valueMotion: number;
  registerAt: Date;
  location: string;
}
