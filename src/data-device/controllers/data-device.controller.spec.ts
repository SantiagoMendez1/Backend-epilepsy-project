import { Test, TestingModule } from '@nestjs/testing';
import { DataDeviceController } from './data-device.controller';

describe('DataBluetoothController', () => {
  let controller: DataDeviceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataDeviceController],
    }).compile();

    controller = module.get<DataDeviceController>(DataDeviceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
