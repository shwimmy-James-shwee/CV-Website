import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AzureADGuard } from '../../../src/guard/auth/azuread.guard';
import { adminAdUser } from '../../__data__/user.data';
import { User, UserRole } from '@prisma/client';
import { APIReturnObjectify, seedBusinessUnit } from '../../utils';
import { DatabaseService } from '../../../src/database/database.service';
import { ROUTE } from '../../../src/shared/endpoints';
import { BusinessUnitModule } from '../../../src/api/admin/business-unit/business-unit.module';

describe('BusinessUnitModule (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BusinessUnitModule],
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
    const { status, body } = await request(app.getHttpServer()).get(ROUTE.businessUnit.base);
    expect(status).toBe(200);

    expect(body).toHaveLength(2);
  });

  it('/:id (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      ROUTE.businessUnit.base + `/${seedBusinessUnit.id}`,
    );
    expect(status).toBe(200);

    expect(body).toMatchObject(APIReturnObjectify(seedBusinessUnit));

    // get non-existing user
    await request(app.getHttpServer())
      .get(ROUTE.businessUnit.base + `/6786786`)
      .expect(404)
      .expect({ message: 'Business Unit not found', error: 'Not Found', statusCode: 404 });
  });
});
