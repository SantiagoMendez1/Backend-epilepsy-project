import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Seizure } from '../schemas/seizure-data.schema';
import {
  SeizureLog,
  SeizureInformation,
} from '../interfaces/seizure-data.interface';
import mongoose from 'mongoose';

@Injectable()
export class SeizureDataService {
  constructor(
    @InjectModel(Seizure.name)
    private SeizureModel: Model<Seizure>,
  ) {}

  async createRegister(seizureLog: SeizureLog): Promise<SeizureLog> {
    try {
      const logSeizure = await this.SeizureModel.findOne({
        pacientName: seizureLog.pacientName,
      }).exec();
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

  async findLastSeizure(idSeizure: string): Promise<SeizureInformation> {
    try {
      const logPacient = await this.SeizureModel.findById(
        new mongoose.Types.ObjectId(idSeizure),
      ).exec();
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
