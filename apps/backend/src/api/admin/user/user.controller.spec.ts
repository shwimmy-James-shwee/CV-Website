import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseService } from '../../../database/database.service';
import { Prisma, UserRole } from '@core/db';
import { v4 as uuid } from 'uuid';
import { userArray } from './__test__/user.data';

const userId = uuid();

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        DatabaseService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn((createUserDto: Prisma.UserCreateInput) => {
              return Promise.resolve({ ...createUserDto, id: userId });
            }),
            findAll: jest.fn((role?: UserRole) => {
              if (role) return Promise.resolve(userArray.filter((user) => user.userRoles.includes(role as never)));
              return Promise.resolve(userArray);
            }),
            findOne: jest.fn((id: string) => {
              return Promise.resolve(userArray.find((user) => user.id === id));
            }),
            remove: jest.fn((id: string) => {
              return Promise.resolve(userArray.find((user) => user.id === id));
            }),
            update: jest.fn((id: string, updateUserDto: Prisma.UserUpdateInput) => {
              const user = userArray.find((user) => user.id === id);
              return Promise.resolve({ ...user, ...updateUserDto });
            })
          }
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should able to create user', async () => {
    const user = {
      lastName: 'Doe',
      firstName: 'John',
      loginEmail: 'johndoe@hotmail.com',
      userRoles: [UserRole.ADMINISTRATOR]
    };

    expect(controller.create(user)).resolves.toMatchObject(user);
  });

  it('should able to return all user or by role', async () => {
    expect(controller.findAll()).resolves.toEqual(userArray);
    expect(controller.findAll(UserRole.ADMINISTRATOR)).resolves.toEqual(
      userArray.filter((user) => user.userRoles.includes(UserRole.ADMINISTRATOR as never))
    );
  });

  it('should able to find a user', async () => {
    expect(controller.findOne(userArray[0].id)).resolves.toEqual(userArray[0]);
    expect(controller.findOne('dont-exist-user-id')).rejects.toThrow('User not found');
  });

  it('should able to delete a user', async () => {
    expect(controller.remove(userArray[0].id)).resolves.toEqual(userArray[0]);
  });

  it('should able to update a user', async () => {
    expect(controller.update(userArray[0].id, { firstName: 'Dave' })).resolves.toEqual({
      ...userArray[0],
      firstName: 'Dave'
    });
  });
});
