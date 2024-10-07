import { CurrentUserType } from '../context/UserContext';

export const dummyUser: CurrentUserType = {
  id: 'fake-0741-4354-8d28-e649380cbc4f',
  loginEmail: 'jamesPearce@email.com',
  firstName: 'James',
  lastName: 'Pearce',
  isSuperAdmin: false,
  avatarUrl: '/assets/defaultAvatar.png',
  createdAt: new Date('2024-04-02T01:59:25.943Z'),
  updatedAt: new Date('2024-04-02T01:59:25.943Z'),
};
