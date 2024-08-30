import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUnitController } from './business-unit.controller';
import { BusinessUnitService } from './business-unit.service';
import { DatabaseService } from '../../../database/database.service';
import { businessUnitArray } from './__test__/business-unit.data';

describe('Admin/BusinessUnitController', () => {
  let controller: BusinessUnitController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BusinessUnitController],
      providers: [
        DatabaseService,
        {
          provide: BusinessUnitService,
          useValue: {
            findAll: jest.fn(() => {
              return Promise.resolve(businessUnitArray);
            }),
            findOne: jest.fn((id: string) => {
              return Promise.resolve(businessUnitArray.find((bu) => bu.id === id));
            })
          }
        }
      ]
    }).compile();

    controller = module.get<BusinessUnitController>(BusinessUnitController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should able to return all business units', async () => {
    expect(controller.findAll()).resolves.toEqual(businessUnitArray);
  });

  it('should able to find a business unit', async () => {
    expect(controller.findOne(businessUnitArray[0].id)).resolves.toEqual(businessUnitArray[0]);
    expect(controller.findOne('2000')).rejects.toThrow('Business Unit not found');
  });
});
