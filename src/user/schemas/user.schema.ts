import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import * as uniqueValidator from 'mongoose-unique-validator';

function contactsArrayLimit(val: ContactsUser[]) {
  return val.length <= 3;
}

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
  @Prop({ required: true, lowercase: true, unique: true })
  name: string;

  @Prop({ unique: [true, 'Duplicate email'] })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  roles: string;

  @Prop({
    type: [ContactsUser],
    validate: [contactsArrayLimit, 'The max size is 3 contacts'],
  })
  contacts: Types.Array<ContactsUser>;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.plugin(uniqueValidator);
