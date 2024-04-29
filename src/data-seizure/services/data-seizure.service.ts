import { Injectable } from '@nestjs/common';
//import { RegisterSeizure } from '../interfaces/data-seizure.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  InformationSeizure,
  RegistersSeizure,
} from '../schemas/data-seizure.schema';
import { CreateRegisterSeizureDto } from '../dtos/data-seizure.dto';
import mongoose from 'mongoose';

@Injectable()
export class DataSeizureService {
  constructor(
    @InjectModel(RegistersSeizure.name)
    private registerSeizureModel: Model<RegistersSeizure>,
  ) {}

  async createRegister(
    createRegisterSeizureDto: CreateRegisterSeizureDto,
  ): Promise<RegistersSeizure> {
    const registerSeizure = await this.registerSeizureModel.findOne({
      pacientName: createRegisterSeizureDto.pacientName,
    });
    if (!registerSeizure) {
      const createdRegister = new this.registerSeizureModel(
        createRegisterSeizureDto,
      );
      return await createdRegister.save();
    }
    registerSeizure.dataValues.push(createRegisterSeizureDto.dataValues);
    return await registerSeizure.save();
  }

  async getLastSeizure(idSeizure: string): Promise<InformationSeizure> {
    const registerPacient = await this.registerSeizureModel.findById(
      new mongoose.Types.ObjectId(idSeizure),
    );
    const dataSeizureValues = registerPacient.dataValues;
    const lastDataDeizure = dataSeizureValues[dataSeizureValues.length - 1];
    return lastDataDeizure;
  }
}
