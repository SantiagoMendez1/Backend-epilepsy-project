import { Test, TestingModule } from '@nestjs/testing';
import { DataBluetoothController } from './data-bluetooth.controller';

describe('DataBluetoothController', () => {
  let controller: DataBluetoothController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataBluetoothController],
    }).compile();

    controller = module.get<DataBluetoothController>(DataBluetoothController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
