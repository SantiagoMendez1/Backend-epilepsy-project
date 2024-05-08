import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class ContactsUser {
  @Prop({ required: true, lowercase: true })
  name: string;

  @Prop({ required: true })
  numberPhone: string;
}
export const ConstactUserschema = SchemaFactory.createForClass(ContactsUser);

@Schema()
export class User {
  @Prop({ required: true, lowercase: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ _id: false, type: [ContactsUser] })
  contacts: Types.Array<ContactsUser>;
}

export const UserSchema = SchemaFactory.createForClass(User);
