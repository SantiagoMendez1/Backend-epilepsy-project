import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class InformationSeizure {
  @Prop({ required: true })
  valueBpm: number;
  @Prop({ required: true })
  valueMotion: number;
  @Prop({ required: false, default: Date.now })
  registerAt: Date;
  @Prop({ required: true })
  location: string;
}

export const InformationSeizureSchema =
  SchemaFactory.createForClass(InformationSeizure);

@Schema()
export class RegistersSeizure {
  @Prop({ required: true })
  pacientName: string;
  @Prop({ _id: false, type: [InformationSeizure] })
  dataValues: Types.Array<InformationSeizure>;
}

export const RegisterSeizureSchema =
  SchemaFactory.createForClass(RegistersSeizure);
