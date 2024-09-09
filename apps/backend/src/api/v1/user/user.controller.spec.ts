import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { DatabaseService } from '../../../database/database.service';
import { Request } from 'express';
import { UserRole } from '@core/db';
import { UserService } from './user.service';
import { userArray } from './__test__/user.data';
import { DatabaseModule } from '../../../database/database.module';

describe('V1/UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [DatabaseModule],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAdminUsers: jest.fn().mockResolvedValue([{ id: 'id', firstName: 'first', lastName: 'last' }]),
            findUserBusinessUnits: jest.fn().mockResolvedValue([{ id: 'test', name: 'test' }]),
            findMany: jest.fn().mockResolvedValue(userArray),
          },
        },
        DatabaseService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should able to get current user', async () => {
    const req = {
      user: {
        id: 'abc-def-g',
        lastName: 'Doe',
        firstName: 'John',
        loginEmail: 'johndoe@hotmail.com',
        userRoles: [UserRole.ADMINISTRATOR],
      },
    } as unknown as Request;

    const result = await controller.getCurrentUser(req);
    expect(result).toEqual({ ...req.user, InBusinessUnits: [{ id: 'test', name: 'test' }] });
  });

  it('should able to find all admin users for a business unit - 200', async () => {
    const req = {
      user: {
        id: 'abc-def-g',
        lastName: 'Doe',
        firstName: 'John',
        loginEmail: 'johndoe@hotmail.com',
        userRoles: [UserRole.ADMINISTRATOR],
      },
    } as unknown as Request;
    const result = await controller.getAdminUsersByBusinessUnitId(req, 'test');
    expect(result).toEqual([{ id: 'id', firstName: 'first', lastName: 'last' }]);
    expect(service.getAdminUsers).toHaveBeenCalled();
  });

  it('should able to find all admin users for a business unit - 403', async () => {
    const req = {
      user: {
        id: 'abc-def-g',
        lastName: 'Doe',
        firstName: 'John',
        loginEmail: 'johndoe@hotmail.com',
        userRoles: [UserRole.ADMINISTRATOR],
      },
    } as unknown as Request;

    controller.getAdminUsersByBusinessUnitId = jest.fn().mockRejectedValue(new Error('Forbidden'));
    await expect(controller.getAdminUsersByBusinessUnitId(req, 'id')).rejects.toThrow('Forbidden');
  });
});
