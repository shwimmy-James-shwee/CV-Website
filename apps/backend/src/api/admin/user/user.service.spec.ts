import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { DatabaseService } from '../../../database/database.service';
import { Prisma, UserRole } from '@core/db';
import { v4 as uuid } from 'uuid';
import { userArray } from './__test__/user.data';

describe('UserService', () => {
  let service: UserService;
  let prisma: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: DatabaseService,
          useValue: {
            user: {
              findMany: jest.fn((args?: Prisma.UserFindManyArgs) => {
                if (args?.where?.roles?.has === UserRole.STANDARD_USER) {
                  return Promise.resolve(
                    userArray.filter((user) => user.userRoles.includes(UserRole.STANDARD_USER as never))
                  );
                }
                return Promise.resolve(userArray);
              }),
              findUnique: jest.fn((args: Prisma.UserFindUniqueArgs) => {
                if (args.where.id) return Promise.resolve(userArray.find((user) => user.id === args.where.id));
                if (args.where.loginEmail)
                  return Promise.resolve(userArray.find((user) => user.loginEmail === args.where.loginEmail));
              }),
              findFirst: jest.fn().mockResolvedValue(userArray[0]),
              create: jest.fn((args: Prisma.UserCreateArgs) => {
                return {
                  id: uuid(),
                  ...args.data
                };
              }),
              update: jest.fn((args: Prisma.UserUpdateArgs) => {
                const user = userArray.find((user) => user.id === args.where.id);
                return Promise.resolve({ ...user, ...args.data });
              }),
              delete: jest.fn((args: Prisma.UserDeleteArgs) => {
                return Promise.resolve(userArray.find((user) => user.id === args.where.id));
              })
            },
            signInLog: {
              create: jest.fn((args: Prisma.SignInLogCreateArgs) => {
                return {
                  id: uuid(),
                  ...args.data
                };
              })
            }
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data on create', async () => {
    const fakeUser = { lastName: 'Edo', firstName: 'Nohn', loginEmail: 'nohnedo@hotmail.com' };
    const data = await service.create(fakeUser);
    expect(data).toMatchObject(fakeUser);
  });

  it('should a users by id', async () => {
    const users = await service.findOne(userArray[0].id);
    expect(users).toEqual(userArray[0]);
  });

  it('should a users by email', async () => {
    const users = await service.findOneByEmail(userArray[0].loginEmail);
    expect(users).toEqual(userArray[0]);
  });

  it('should find all users without role', async () => {
    const users = await service.findAll();
    expect(users).toEqual(userArray);
  });

  it('should able to update user', async () => {
    const users = await service.update(userArray[0].id, { lastName: 'Doe2000' });
    expect(users).toEqual({ ...userArray[0], lastName: 'Doe2000' });
  });

  it('should able to delete user', async () => {
    const users = await service.remove(userArray[0].id);
    expect(users).toEqual(userArray[0]);
  });

  it('should find all users with role', async () => {
    const users = await service.findAll(UserRole.STANDARD_USER);
    const filteredUsers = userArray.filter((user) => user.userRoles.includes(UserRole.STANDARD_USER as never));
    expect(users).toEqual(filteredUsers);
  });

  it('should able to create sign in log', async () => {
    const fakeLog = {
      userId: userArray[0].id,
      signInDateTime: new Date('2099-01-01'),
      User: userArray[0]
    } as Prisma.SignInLogCreateInput;
    const log = await service.createSignInLog(fakeLog);
    expect(log).toMatchObject({ userId: userArray[0].id });
    expect(prisma.signInLog.create).toHaveBeenCalledTimes(1);
  });
});
