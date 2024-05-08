import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserLog, ContactUser } from '../interfaces/user.interface';
import { User } from '../schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

  async createUser(user: UserLog): Promise<User> {
    const userModel = new this.UserModel(user);
    return await userModel.save();
  }

  async findByUserEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({ email: email }).exec();
  }

  async findByUserId(id: string): Promise<User> {
    return await this.UserModel.findById(id);
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

  async upadteContactsUser(
    userId: string,
    contactsUser: ContactUser[],
  ): Promise<User> {
    try {
      const user = await this.UserModel.findOneAndUpdate(
        { _id: userId },
        { $set: { contacts: contactsUser } },
        { new: true },
      ).exec();
      if (!user) {
        throw new NotFoundException(`User #${userId} not found`);
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async deleteUser(userId: string): Promise<User> {
    const userToDelete = await this.UserModel.findByIdAndDelete(userId);
    if (!userToDelete) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return userToDelete;
  }
}
