import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class SeizureInformation {
  @Prop({ required: true })
  valueBpm: number;
  @Prop({ required: true })
  valueMotion: number;
  @Prop({ required: false, default: Date.now })
  registerAt: Date;
  @Prop({ required: true })
  location: string;
}

export const SeizureInformationSchema =
  SchemaFactory.createForClass(SeizureInformation);

@Schema()
export class SeizureLogs {
  @Prop({ required: true })
  pacientName: string;
  @Prop({ _id: false, type: [SeizureInformation] })
  dataValues: Types.Array<SeizureInformation>;
}

export const SeizureLogsSchema = SchemaFactory.createForClass(SeizureLogs);