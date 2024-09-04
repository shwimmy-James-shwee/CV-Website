import { prisma } from '@core/db';
import { CurrentUserType } from '../context/UserContext';

export const dummyUser: CurrentUserType = {
  id: 'fake-0741-4354-8d28-e649380cbc4f',
  externalOid: 'fake-9ab2-4950-b55b-b256697c583e',
  loginEmail: 'hanli@kpmg.co.nz',
  firstName: 'han',
  lastName: 'li',
  isSuperAdmin: false,
  roles: [prisma.UserRole.STANDARD_USER],
  avatarUrl: '/assets/defaultAvatar.png',
  thumbnailPhoto: [],
  timeZoneOffSet: '-780',
  timeZone: 'Pacific/Auckland',
  notificationFrequency: prisma.NotificationFrequency.REALTIME,
  createdAt: new Date('2024-04-02T01:59:25.943Z'),
  updatedAt: new Date('2024-04-02T01:59:25.943Z'),
  InBusinessUnits: [
    {
      id: 'test-id',
      name: 'test-name',
    },
  ],
};
