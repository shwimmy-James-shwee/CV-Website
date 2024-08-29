import { BusinessUnit, BusinessUnitType, NotificationFrequency, User, UserRole } from '../shared/schema';

export const businessUnitTestData: BusinessUnit[] = [
  {
    id: '1',
    name: 'Test Business Unit 1',
    createdAt: '2022-01-19T00:00:00.000Z' as Date & string,
    updatedAt: '2022-01-19T00:00:00.000Z' as Date & string,
    type: BusinessUnitType.TEAM
  },
  {
    id: '2',
    name: 'Test Business Unit 2',
    createdAt: '2022-01-19T00:00:00.000Z' as Date & string,
    updatedAt: '2022-01-19T00:00:00.000Z' as Date & string,
    type: BusinessUnitType.DEPARTMENT
  },
  {
    id: '3',
    name: 'Test Business Unit 3',
    createdAt: '2022-01-19T00:00:00.000Z' as Date & string,
    updatedAt: '2022-01-19T00:00:00.000Z' as Date & string,
    type: BusinessUnitType.DIVISION
  },
  {
    id: '4',
    name: 'Test Business Unit 4',
    createdAt: '2022-01-19T00:00:00.000Z' as Date & string,
    updatedAt: '2022-01-19T00:00:00.000Z' as Date & string,
    type: BusinessUnitType.COMPANY
  }
];

export const UserTestData: User[] = [
  {
    avatarUrl: 'https://regtechtimes.com/wp-content/uploads/2019/06/kpmg12.jpg',
    createdAt: '2022-01-19T00:00:00.000Z' as Date & string,
    updatedAt: '2022-01-19T00:00:00.000Z' as Date & string,
    firstName: 'Test User 1',
    lastName: 'Tester',
    id: '1',
    notificationFrequency: NotificationFrequency.REALTIME,
    loginEmail: 'tester1@kpmg.co.nz',
    timeZoneOffSet: '-780',
    timeZone: 'Pacific/Auckland',
    roles: [UserRole.ADMINISTRATOR]
  },
  {
    avatarUrl: 'https://regtechtimes.com/wp-content/uploads/2019/06/kpmg12.jpg',
    createdAt: '2022-01-19T00:00:00.000Z' as Date & string,
    updatedAt: '2022-01-19T00:00:00.000Z' as Date & string,
    firstName: 'Test User 2',
    lastName: 'Tester',
    id: '2',
    notificationFrequency: NotificationFrequency.REALTIME,
    loginEmail: 'tester2@kpmg.co.nz',
    timeZoneOffSet: '-780',
    timeZone: 'Pacific/Auckland',
    roles: [UserRole.ADMINISTRATOR]
  },
  {
    avatarUrl: 'https://regtechtimes.com/wp-content/uploads/2019/06/kpmg12.jpg',
    createdAt: '2022-01-19T00:00:00.000Z' as Date & string,
    updatedAt: '2022-01-19T00:00:00.000Z' as Date & string,
    firstName: 'Test User 3',
    lastName: 'Tester',
    id: '3',
    loginEmail: 'tester3@kpmg.co.nz',
    notificationFrequency: NotificationFrequency.REALTIME,
    timeZoneOffSet: '-780',
    timeZone: 'Pacific/Auckland',
    roles: [UserRole.STANDARD_USER]
  },
  {
    avatarUrl: 'https://regtechtimes.com/wp-content/uploads/2019/06/kpmg12.jpg',
    createdAt: '2022-01-19T00:00:00.000Z' as Date & string,
    updatedAt: '2022-01-19T00:00:00.000Z' as Date & string,
    firstName: 'Test User 4',
    lastName: 'Tester',
    notificationFrequency: NotificationFrequency.REALTIME,
    id: '4',
    loginEmail: 'tester4@kpmg.co.nz',
    timeZoneOffSet: '-780',
    timeZone: 'Pacific/Auckland',
    roles: [UserRole.ADMINISTRATOR]
  }
];
