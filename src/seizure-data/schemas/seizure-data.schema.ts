import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class SeizureInformation {
  @Prop({ required: true })
  valueBpm: number;
  @Prop({ required: true })
  valueSo2: number;
  @Prop({ required: true })
  registerAt: Date;
  @Prop({ required: true })
  location: string;
}

export const SeizureInformationSchema =
  SchemaFactory.createForClass(SeizureInformation);

@Schema({ _id: true })
export class Seizure {
  @Prop({ required: true })
  pacientName: string;
  @Prop({ _id: true, type: [SeizureInformation] })
  dataValues: Types.Array<SeizureInformation>;
}

export const SeizureLogsSchema = SchemaFactory.createForClass(Seizure);
