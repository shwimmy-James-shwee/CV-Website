import { Test, TestingModule } from '@nestjs/testing';
import { BusinessUnitService } from './business-unit.service';
import { DatabaseService } from '../../../database/database.service';
import { Prisma } from '@core/db';
import { businessUnitArray } from './__test__/business-unit.data';

describe('Admin/BusinessUnitService', () => {
  let service: BusinessUnitService;
  let prisma: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BusinessUnitService,
        {
          provide: DatabaseService,
          useValue: {
            businessUnit: {
              findUnique: jest.fn((args: Prisma.BusinessUnitFindUniqueArgs) => {
                if (args.where.id) return Promise.resolve(businessUnitArray.find((bu) => bu.id === args.where.id));
              }),
              findMany: jest.fn((args?: Prisma.BusinessUnitFindManyArgs) => {
                args;
                return Promise.resolve(businessUnitArray);
              })
            }
          }
        }
      ]
    }).compile();

    service = module.get<BusinessUnitService>(BusinessUnitService);
    prisma = module.get<DatabaseService>(DatabaseService);
    prisma;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a business unit by id', async () => {
    const businessUnit = await service.findOne(businessUnitArray[0].id);
    expect(businessUnit).toEqual(businessUnitArray[0]);
  });

  it('should return all business units', async () => {
    const businessUnits = await service.findAll();
    expect(businessUnits).toEqual(businessUnitArray);
  });
});
