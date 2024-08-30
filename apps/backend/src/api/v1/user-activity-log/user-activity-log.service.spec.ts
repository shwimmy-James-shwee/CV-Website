import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityLogService } from './user-activity-log.service';
import { DatabaseService } from '../../../database/database.service';
import { Prisma } from '@core/db';
import {
  userActivityLogAggByEventUrl,
  userActivityLogAggByUserId,
  userActivityLogArray
} from './__test__/user-activity-log.data';

const logId = () => Math.floor(Math.random() * 100000);

describe('V1/UserService', () => {
  let service: UserActivityLogService;
  let prisma: DatabaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserActivityLogService,
        {
          provide: DatabaseService,
          useValue: {
            userActivityLog: {
              create: jest.fn((args: Prisma.UserActivityLogCreateArgs) => {
                return {
                  id: logId(),
                  ...args.data,
                  userId: args?.data?.User?.connect?.id
                };
              }),
              findFirst: jest.fn((args: Prisma.UserActivityLogFindFirstArgs) => {
                if (
                  args?.where?.sessionIdentifier === userActivityLogArray[0]?.sessionIdentifier &&
                  args?.where?.eventUrl === userActivityLogArray[0]?.eventUrl
                ) {
                  return Promise.resolve(userActivityLogArray[0]);
                }

                return Promise.resolve(null);
              }),
              findMany: jest.fn(() => {
                return Promise.resolve(userActivityLogArray);
              }),

              update: jest.fn((args: Prisma.UserActivityLogUpdateArgs) => {
                const item = userActivityLogArray.find((log) => log.id === args.where.id);
                return Promise.resolve({ ...item, ...args.data });
              }),
              groupBy: jest.fn((args: Prisma.UserActivityLogGroupByArgs) => {
                if (args.by[0] === 'eventUrl') {
                  return Promise.resolve(userActivityLogAggByEventUrl);
                } else if (args.by[0] === 'userId') {
                  return Promise.resolve(userActivityLogAggByUserId);
                }
              })
            },
            user: {
              findMany: jest.fn()
            }
          }
        }
      ]
    }).compile();

    service = module.get<UserActivityLogService>(UserActivityLogService);
    prisma = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data on create', async () => {
    const fakeUserActivityLog = {
      sessionIdentifier: 'abcd',
      eventStartTime: new Date(),
      eventEndTime: new Date(),
      eventDuration: 5000,
      eventUrl: 'http://localhost:3000',
      User: { connect: { id: 'abcd-userid' } }
    } as Prisma.UserActivityLogCreateInput;
    const data = await service.create(fakeUserActivityLog);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (fakeUserActivityLog as any).User;

    expect(data).toMatchObject(fakeUserActivityLog);
    expect(prisma.userActivityLog.create).toHaveBeenCalledTimes(1);
  });

  it('should find all log ', async () => {
    const data = await service.findAll({ id: 'asc' });
    expect(data).toEqual(userActivityLogArray);
    expect(prisma.userActivityLog.findMany).toHaveBeenCalledTimes(1);
  });

  it('should able to find one log by condition', async () => {
    const data = await service.findOne({
      sessionIdentifier: userActivityLogArray[0]?.sessionIdentifier,
      eventUrl: userActivityLogArray[0]?.eventUrl
    });
    expect(data).toEqual(userActivityLogArray[0]);
    expect(prisma.userActivityLog.findFirst).toHaveBeenCalledTimes(1);
  });

  it('should able to update user', async () => {
    const data = await service.update(userActivityLogArray[0].id, { eventDuration: 9000 });
    expect(data).toEqual({ ...userActivityLogArray[0], eventDuration: 9000 });
    expect(prisma.userActivityLog.update).toHaveBeenCalledTimes(1);
  });

  it('should able to find agg by', async () => {
    const data = await service.findAllAggregateBy('eventUrl');
    expect(data).toEqual(userActivityLogAggByEventUrl);

    const dataSec = await service.findAllAggregateBy('userId');
    expect(dataSec).toEqual(userActivityLogAggByUserId);

    expect(prisma.userActivityLog.groupBy).toHaveBeenCalledTimes(2);
  });

  it('should able to all user email and id', async () => {
    prisma.user.findMany = jest.fn().mockReturnValue([{ id: 'abcd', loginEmail: 'hanli@kpmg.co.nz' }]);
    const data = await service.findAllUniqueUserIdEmails();
    expect(data).toEqual([{ id: 'abcd', loginEmail: 'hanli@kpmg.co.nz' }]);
  });
});
