import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserActivityLogModule } from '../../../src/api/v1/user-activity-log/user-activity-log.module';
import { AzureADGuard } from '../../../src/guard/auth/azuread.guard';
import { Prisma } from '@core/db';
import { APIReturnObjectify, seedParentBusinessUnit, seedUser, seedUserActivityLog } from '../../utils';
import { DatabaseService } from '../../../src/database/database.service';
import { ROUTE } from '../../../src/shared/endpoints';

describe('UserActivityLogModule (e2e)', () => {
  let app: INestApplication;
  let prisma: DatabaseService;

  const logData = {
    sessionIdentifier: 'new-def-gg',
    eventStartTime: new Date('2024-04-16'),
    eventDuration: 5000,
    eventUrl: 'http://localhost:3000'
  } as Prisma.UserActivityLogCreateInput;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserActivityLogModule]
    })
      .overrideGuard(AzureADGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const request = context.switchToHttp().getRequest();
          request.user = { ...seedUser };
          return true;
        }
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

  it('/ (POST)', async () => {
    await request(app.getHttpServer()).post(ROUTE.userActivityLog.base).send(logData).expect(201).expect({});
    const newLog = await prisma.userActivityLog.findFirst({
      where: { sessionIdentifier: logData.sessionIdentifier, eventUrl: logData.eventUrl }
    });
    expect(newLog).toMatchObject(logData);

    await request(app.getHttpServer()).post(ROUTE.userActivityLog.base).send(logData).expect(201).expect({});

    const updatedLog = await prisma.userActivityLog.findFirst({
      where: { sessionIdentifier: logData.sessionIdentifier, eventUrl: logData.eventUrl }
    });
    expect(updatedLog).toMatchObject({ ...logData, eventDuration: 10000 });
  });

  it('/ (GET) (Featured)', async () => {
    const { status, body } = await request(app.getHttpServer()).get(
      ROUTE.userActivityLog.base + ROUTE.userActivityLog.featuredLog
    );
    expect(status).toBe(200);

    expect(body).toMatchObject(APIReturnObjectify([seedUserActivityLog]));
  });

  it('/ (GET) (Featured) (Fail 403)', async () => {
    await prisma.businessUnit.update({ where: { id: seedParentBusinessUnit.id }, data: { features: [] } });
    const { status } = await request(app.getHttpServer()).get(
      ROUTE.userActivityLog.base + ROUTE.userActivityLog.featuredLog
    );
    expect(status).toBe(403);
  });

  it('/ (GET)', async () => {
    const { status, body } = await request(app.getHttpServer()).get(ROUTE.userActivityLog.base);
    expect(status).toBe(200);

    expect(body).toMatchObject(
      APIReturnObjectify({
        attributes: { users: [{ id: seedUser.id, loginEmail: seedUser.loginEmail }] },
        data: [
          {
            eventDuration: 5000,
            eventEndTime: '2024-04-16T00:00:00.000Z',
            eventParam: null,
            eventStartTime: '2024-04-16T00:00:00.000Z',
            eventUrl: '/faq',
            sessionIdentifier: 'abc-def-gg',
            userId: seedUser.id
          }
        ]
      })
    );
  });

  it('/ (GET) Aggregated eventUrl', async () => {
    const { status, body } = await request(app.getHttpServer())
      .get(ROUTE.userActivityLog.base)
      .query({ by: 'eventUrl' });
    expect(status).toBe(200);
    expect(body).toMatchObject(
      APIReturnObjectify({
        attributes: { users: [{ id: seedUser.id, loginEmail: seedUser.loginEmail }] },
        data: [{ _sum: { eventDuration: 5000 }, eventUrl: '/faq' }]
      })
    );
  });

  it('/ (GET) Aggregated userId', async () => {
    const { status, body } = await request(app.getHttpServer()).get(ROUTE.userActivityLog.base).query({ by: 'userId' });
    expect(status).toBe(200);
    expect(body).toMatchObject(
      APIReturnObjectify({
        attributes: { users: [{ id: seedUser.id, loginEmail: seedUser.loginEmail }] },
        data: [{ _sum: { eventDuration: 5000 }, userId: seedUser.id }]
      })
    );
  });
});
