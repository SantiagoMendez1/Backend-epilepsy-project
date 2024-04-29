import { Injectable } from '@nestjs/common';
//import { RegisterSeizure } from '../interfaces/data-seizure.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  SeizureInformation,
  SeizureLogs,
} from '../schemas/seizure-data.schema';
import { CreateSeizureLogDto } from '../dtos/seizure-data.dto';
import mongoose from 'mongoose';

@Injectable()
export class SeizureDataService {
  constructor(
    @InjectModel(SeizureLogs.name)
    private SeizureModel: Model<SeizureLogs>,
  ) {}

  async createRegister(
    createRegisterSeizureDto: CreateSeizureLogDto,
  ): Promise<SeizureLogs> {
    const logSeizure = await this.SeizureModel.findOne({
      pacientName: createRegisterSeizureDto.pacientName,
    });
    if (!logSeizure) {
      const createdRegister = new this.SeizureModel(createRegisterSeizureDto);
      return await createdRegister.save();
    }
    logSeizure.dataValues.push(createRegisterSeizureDto.dataValues);
    return await logSeizure.save();
  }

  async getLastSeizure(idSeizure: string): Promise<SeizureInformation> {
    const logPacient = await this.SeizureModel.findById(
      new mongoose.Types.ObjectId(idSeizure),
    );
    const dataSeizureValues = logPacient.dataValues;
    const lastDataDeizure = dataSeizureValues[dataSeizureValues.length - 1];
    return lastDataDeizure;
  }

  async getRegisters(): Promise<SeizureLogs[]> {
    return await this.SeizureModel.find();
  }
}
