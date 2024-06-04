import { ObjectId } from 'mongoose';

export interface ContactUser {
  readonly name: string;
  readonly numberPhone: string;
}

export interface UserLog {
  readonly _id?: ObjectId;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly roles: string;
  readonly contacts: ContactUser[];
}
