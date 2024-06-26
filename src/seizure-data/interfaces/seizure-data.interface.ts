export interface SeizureInformation {
  readonly valueBpm: number;
  readonly valueSo2: number;
  readonly registerAt: Date;
  readonly location: string;
}

export interface SeizureLog {
  readonly pacientName: string;
  readonly dataValues: SeizureInformation[];
}

export interface SaveSeizure {
  readonly pacientName: string;
  readonly valueBpm: number;
  readonly valueSo2: number;
  readonly registerAt: Date;
  readonly location: string;
}
