import { Prisma, UserRole, User, NotificationFrequency } from '@core/db';

export const adminAdUser = {
  id: 'dummy-0741-4354-8d28-e649380cbc4f',
  externalOid: 'dummy-9ab2-4950-b55b-b256697c583e',
  loginEmail: 'dummy@kpmg.co.nz',
  firstName: 'dymmy',
  lastName: 'user',
  isSuperAdmin: false,
  roles: [UserRole.STANDARD_USER],
  avatarUrl: '/assets/defaultAvatar.png',
  thumbnailPhoto: [],
  timeZoneOffSet: '-780',
  timeZone: 'Pacific/Auckland',
  createdAt: new Date('2024-04-02T01:59:25.943Z'),
  updatedAt: new Date('2024-04-02T01:59:25.943Z'),
  notificationFrequency: NotificationFrequency.HOURLY,
  SignInLog: [
    {
      id: 'dummy-ae0b-4d50-bd13-9a2b8bb59493',
      userId: '543becda-0741-4354-8d28-e649380cbc4f',
      createdAt: '2024-04-12T00:48:39.071Z',
      updatedAt: '2024-04-12T00:48:39.071Z',
      signInDateTime: '2024-04-12T00:47:53.000Z'
    }
  ]
} as User;

export const seedUserData = {
  firstName: 'seedUserFN',
  lastName: 'seedUserLN',
  loginEmail: 'seeduser@email.com'
} as Prisma.UserCreateInput;
