import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Seizure } from '../schemas/seizure-data.schema';
import {
  SeizureLog,
  SeizureInformation,
  SaveSeizure,
} from '../interfaces/seizure-data.interface';
import { UserReq } from 'src/user/interfaces/user-req.interface';

@Injectable()
export class SeizureDataService {
  constructor(
    @InjectModel(Seizure.name)
    private SeizureModel: Model<Seizure>,
  ) {}

  async createRegister(saveSeizure: SaveSeizure): Promise<SeizureLog> {
    try {
      const { pacientName, ...newSeizure } = saveSeizure;
      console.log(newSeizure);
      const logSeizure = await this.SeizureModel.findOne({
        pacientName: pacientName,
      }).exec();
      const seizure = {
        pacientName: pacientName,
        dataValues: newSeizure,
      };
      if (!logSeizure) {
        const createdRegister = new this.SeizureModel(seizure);
        return await createdRegister.save();
      }
      logSeizure.dataValues.push(newSeizure);
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
      const userName = user.userName;
      const logPacient = await this.SeizureModel.findOne({
        pacientName: userName,
      }).exec();
      if (!logPacient) {
        throw new NotFoundException(`The user dont have seizure logs`);
      }
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

  async findAllRegisters(patientName?: string): Promise<SeizureLog[]> {
    try {
      const regex = new RegExp(patientName, 'i');
      return await this.SeizureModel.find({ pacientName: regex }).exec();
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
