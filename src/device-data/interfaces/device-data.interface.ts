export interface DeviceData {
  readonly valueBpm: number;
  readonly valueSo2: number;
  readonly date?: Date;
  readonly location: string;
}
