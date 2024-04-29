interface InformationSeizure {
  readonly valueBPM: number;
  readonly valueMotion: number;
  readonly registerAt: Date;
  readonly location: string;
}

export interface RegisterSeizure {
  readonly pacientName: string;
  readonly dataValues: InformationSeizure[];
}
