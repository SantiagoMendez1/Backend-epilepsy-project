import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Seizure } from '../schemas/seizure-data.schema';
import {
  SeizureLog,
  SeizureInformation,
} from '../interfaces/seizure-data.interface';
import { UserReq } from 'src/user/interfaces/user-req.interface';

@Injectable()
export class SeizureDataService {
  constructor(
    @InjectModel(Seizure.name)
    private SeizureModel: Model<Seizure>,
  ) {}

  async createRegister(
    seizureLog: SeizureLog,
    user: UserReq,
  ): Promise<SeizureLog> {
    try {
      const { userId, userName } = user;
      const registerId = userName.concat(userId);
      const logSeizure = await this.SeizureModel.findOne({
        _id: registerId,
      }).exec();
      seizureLog = {
        _id: registerId,
        pacientName: userName,
        dataValues: seizureLog.dataValues,
      };
      if (!logSeizure) {
        const createdRegister = new this.SeizureModel(seizureLog);
        return await createdRegister.save();
      }
      logSeizure.dataValues.push(seizureLog.dataValues);
      return await logSeizure.save();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async findLastSeizure(user: UserReq): Promise<SeizureInformation> {
    try {
      const { userId, userName } = user;
      const registerUser = userName.concat(userId);
      const logPacient = await this.SeizureModel.findOne({
        _id: registerUser,
      }).exec();
      const dataSeizureValues = logPacient.dataValues;
      const lastDataDeizure = dataSeizureValues[dataSeizureValues.length - 1];
      return lastDataDeizure;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  async findAllRegisters(): Promise<SeizureLog[]> {
    try {
      return await this.SeizureModel.find().exec();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: error.message,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }
}
