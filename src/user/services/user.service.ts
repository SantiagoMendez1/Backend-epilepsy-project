import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserLog, ContactUser } from '../interfaces/user.interface';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async createUser(user: UserLog): Promise<User> {
    const userExisted = await this.UserModel.findOne({ name: user.name });
    if (userExisted) {
      throw new HttpException(
        `User ${user.name} already exists`,
        HttpStatus.CONFLICT,
      );
    }
    const userModel = new this.UserModel(user);
    return await userModel.save();
  }

  async deleteUser(userId: string): Promise<User> {
    const userIdObject = mongoose.Types.ObjectId.createFromHexString(userId);
    const userToDelete = await this.UserModel.findByIdAndDelete(userIdObject);
    if (!userToDelete) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return userToDelete;
  }

  async upadteUser(userId: string, userUpdate: UserLog): Promise<User> {
    try {
      const existingUser = await this.UserModel.findByIdAndUpdate(
        userId,
        userUpdate,
      );
      if (!existingUser) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return existingUser;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findByUserEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({ email: email }).exec();
  }

  async findByUserId(userId: string): Promise<User> {
    const userIdObject = mongoose.Types.ObjectId.createFromHexString(userId);
    return await this.UserModel.findById(userIdObject);
  }

  async getUserContacts(userId: string): Promise<ContactUser[]> {
    const userIdObject = mongoose.Types.ObjectId.createFromHexString(userId);
    const user: UserLog = await this.UserModel.findById(userIdObject);
    return user.contacts;
  }

  async addUserContacts(
    userId: string,
    contactUser: ContactUser,
  ): Promise<ContactUser[]> {
    try {
      const user = await this.UserModel.findOneAndUpdate(
        { _id: userId },
        { $push: { contacts: contactUser } },
        { new: true },
      ).exec();
      if (!user) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return user.contacts;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUserContact(userId: string, contactId: string): Promise<User> {
    const contactIdObject = new mongoose.Types.ObjectId(contactId);
    const user = await this.UserModel.findOneAndUpdate(
      { _id: userId },
      { $pull: { contacts: { _id: contactIdObject } } },
      { new: true },
    ).exec();
    return await user.save();
  }

  async updateUserContact(
    userId: string,
    contactId: string,
    updateData: object,
  ): Promise<ContactUser[]> {
    const contactIdObject = await new mongoose.Types.ObjectId(contactId);
    const user = await this.UserModel.findOneAndUpdate(
      { _id: userId, 'contacts._id': contactIdObject },
      { 'contacts.$': updateData },
      { new: true },
    );
    return user.contacts;
  }
}
