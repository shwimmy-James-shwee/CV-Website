import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from '../../../src/api/admin/user/user.module';
import { AzureADGuard } from '../../../src/guard/auth/azuread.guard';
import { adminAdUser } from '../../__data__/user.data';
import { User, UserRole } from '@prisma/client';
import { APIReturnObjectify, seedUser } from '../../utils';
import { DatabaseService } from '../../../src/database/database.service';
import { ROUTE } from '../../../src/shared/endpoints';

describe('UserModule (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    })
      .overrideGuard(AzureADGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request.user = { ...adminAdUser, roles: [UserRole.ADMINISTRATOR] } as User;
          return true;
        },
      })
      .compile();

    app = moduleFixture.createNestApplication();
    prisma = app.get<DatabaseService>(DatabaseService);
    await app.init();
  });

  afterEach(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('/ (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get(ROUTE.user.base);
    expect(status).toBe(200);

    expect(body).toHaveLength(1);
  });

  it('/:id (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get(ROUTE.user.base + `/${seedUser.id}`);
    expect(status).toBe(200);

    expect(body).toMatchObject(APIReturnObjectify(seedUser));

    // get non-existing user
    await request(app.getHttpServer())
      .get(ROUTE.user.base + `/some-user-id`)
      .expect(404)
      .expect({ message: 'User not found', error: 'Not Found', statusCode: 404 });
  });

  it('/ (POST)', async () => {
    const newUser2 = { firstName: 'NewUserFN2', lastName: 'NewUserLN2', loginEmail: 'newuser2@email.com' };
    const { status, body } = await request(app.getHttpServer()).post(ROUTE.user.base).send(newUser2);

    expect(status).toBe(201);
    expect(body).toMatchObject(newUser2);

    expect(await prisma.user.count()).toBe(2);
  });

  it('/ (PATCH)', async () => {
    const updateUser = { firstName: 'UpdatedFN' };
    const { status, body } = await request(app.getHttpServer())
      .patch(ROUTE.user.base + `/${seedUser.id}`)
      .send(updateUser);

    expect(status).toBe(200);
    expect(body).toMatchObject(updateUser);

    expect(await prisma.user.count()).toBe(1);
  });

  it('/ (DELETE)', async () => {
    const { status, body } = await request(app.getHttpServer()).delete(ROUTE.user.base + `/${seedUser.id}`);

    expect(status).toBe(200);
    expect(body).toMatchObject({ id: seedUser.id, firstName: seedUser.firstName, lastName: seedUser.lastName });

    expect(await prisma.user.count()).toBe(0);
  });
});
