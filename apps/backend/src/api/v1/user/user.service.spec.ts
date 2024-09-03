import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../../../database/database.service';
import { Prisma } from '@core/db';
import { userArray } from './__test__/user.data';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findUnique: jest.fn((args: Prisma.UserFindUniqueArgs) => {
                if (args.where.id) return Promise.resolve(userArray.find((user) => user.id === args.where.id));
                return Promise.resolve(userArray.find((user) => user.loginEmail === args.where.loginEmail));
              }),
              findMany: jest.fn().mockResolvedValue(userArray),
            },
            businessUnit: {
              findMany: jest.fn().mockResolvedValue([{ id: 'test', name: 'test' }]),
            },
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should a users by id', async () => {
    const users = await service.findOne(userArray[0].id);
    expect(users).toEqual(userArray[0]);
  });

  it('should a users by email', async () => {
    const users = await service.findOneByEmail(userArray[0].loginEmail);
    expect(users).toEqual(userArray[0]);
  });

  it('should find array of users', async () => {
    const businessUnits = await service.findUserBusinessUnits('');
    expect(businessUnits).toEqual([{ id: 'test', name: 'test' }]);
  });

  it('should find array of users', async () => {
    const users = await service.getAdminUsers('');
    expect(users).toEqual(userArray);
  });
});
