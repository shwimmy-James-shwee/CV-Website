import { NotificationFrequency, UserRole } from '../shared/schema';

export const dummyUser = {
  id: 'fake-0741-4354-8d28-e649380cbc4f',
  externalOid: 'fake-9ab2-4950-b55b-b256697c583e',
  loginEmail: 'hanli@kpmg.co.nz',
  firstName: 'han',
  lastName: 'li',
  isSuperAdmin: false,
  userRoles: [UserRole.STANDARD_USER],
  avatarUrl: '/assets/defaultAvatar.png',
  thumbnailPhoto: [],
  timeZoneOffSet: '-780',
  timeZone: 'Pacific/Auckland',
  notificationFrequency: NotificationFrequency.REALTIME,
  createdAt: new Date('2024-04-02T01:59:25.943Z'),
  updatedAt: new Date('2024-04-02T01:59:25.943Z'),
  jwtIat: new Date('2099-04-02T01:59:25.943Z').getTime(),
  InBusinessUnits: [
    {
      id: 'test-id',
      name: 'test-name',
    },
  ],
};
