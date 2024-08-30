import { Test, TestingModule } from '@nestjs/testing';
import { UserActivityLogController } from './user-activity-log.controller';
import { UserActivityLogService } from './user-activity-log.service';
import { DatabaseService } from '../../../database/database.service';
import { Request } from 'express';
import { Prisma, UserRole } from '@prisma/client';
import {
  uniqueUserIdEmailArray,
  userActivityLogAggByEventUrl,
  userActivityLogAggByUserId,
  userActivityLogArray,
} from './__test__/user-activity-log.data';

const logId = () => Math.floor(Math.random() * 100000);

describe('V1/UserController', () => {
  let controller: UserActivityLogController;
  let service: UserActivityLogService;
  let execute: jest.Mock;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserActivityLogController],
      providers: [DatabaseService, UserActivityLogService],
    }).compile();

    controller = module.get<UserActivityLogController>(UserActivityLogController);
    service = module.get<UserActivityLogService>(UserActivityLogService);
    execute = jest.fn();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  const req = {
    user: {
      id: 'abc-def-g',
      lastName: 'Doe',
      firstName: 'John',
      loginEmail: 'johndoe@hotmail.com',
      userRoles: [UserRole.ADMINISTRATOR],
    },
  } as unknown as Request;

  const log = {
    sessionIdentifier: 'abcd',
    eventStartTime: new Date(),
    eventEndTime: new Date(),
    eventDuration: 5000,
    eventUrl: 'http://localhost:3000',
    createdAt: new Date(),
  } as Prisma.UserActivityLogCreateInput;

  it('should able to record new log', async () => {
    service.findOne = jest.fn().mockResolvedValueOnce(null);
    service.create = jest.fn().mockResolvedValueOnce(execute());

    expect(service.create).toHaveBeenCalledTimes(0);
    expect(controller.record(req, log)).resolves.toEqual(undefined);
    expect(service.findOne).toHaveBeenCalledTimes(1);
    expect(execute).toHaveBeenCalledTimes(1);
  });

  it('should able to record existing log', async () => {
    const existingLog = { ...log, id: logId() };
    service.findOne = jest.fn().mockResolvedValue(existingLog);
    service.update = jest.fn().mockResolvedValue(execute());

    expect(controller.record(req, log)).resolves.toEqual(undefined);
    expect(execute).toHaveBeenCalledTimes(1);
  });
  it('should able to return all log', async () => {
    service.findAll = jest.fn().mockReturnValueOnce(Promise.resolve(userActivityLogArray));

    expect(controller.getActivityLogs()).resolves.toEqual(userActivityLogArray);
  });

  it('should able to return agg by event url and user id', async () => {
    service.findAllUniqueUserIdEmails = jest.fn().mockResolvedValue(uniqueUserIdEmailArray);
    service.findAllAggregateBy = jest.fn().mockResolvedValue(userActivityLogAggByEventUrl);

    await expect(controller.findAll('eventUrl')).resolves.toEqual({
      data: userActivityLogAggByEventUrl,
      attributes: { users: uniqueUserIdEmailArray },
    });

    service.findAllAggregateBy = jest.fn().mockResolvedValue(userActivityLogAggByUserId);
    await expect(controller.findAll('userId')).resolves.toEqual({
      data: userActivityLogAggByUserId,
      attributes: { users: uniqueUserIdEmailArray },
    });
  });

  it('should able to return all log via featured endpoint', async () => {
    service.findAll = jest.fn().mockResolvedValue(userActivityLogArray);
    service.findAllUniqueUserIdEmails = jest.fn().mockResolvedValue(uniqueUserIdEmailArray);

    expect(controller.findAll()).resolves.toEqual({
      data: userActivityLogArray,
      attributes: { users: uniqueUserIdEmailArray },
    });
  });
});
