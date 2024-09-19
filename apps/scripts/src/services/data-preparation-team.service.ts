import { Prisma, UserRole } from '@core/db';
import * as f from '@ngneat/falso';
import { getRandNotificationFrequence } from './data-preparation.service';

/**
 * Insert team members of project here. Copy and paste the first example
 * and change the fields below with relevant user infomation:
 * @loginEmail
 * @firstName
 * @lastName
 */
const teamMembers = [
  {
    loginEmail: 'example_email@kpmg.co.nz',
    firstName: 'John',
    lastName: 'Doe',
    isSuperAdmin: true,
    roles: [UserRole.ADMINISTRATOR, UserRole.STANDARD_USER],
    thumbnailPhoto: [f.randNumber()],
    timeZoneOffSet: `${f.randNumber()}`,
    timeZone: f.randTimeZone(),
    notificationFrequency: getRandNotificationFrequence(),
    createdAt: f.randPastDate({ years: 3 }),
    updatedAt: f.randPastDate({ years: 3 }),
  },
];

/**
 * Export function used in seedUsers() function
 */
export const generateTeamUserCreateInput = (): Prisma.UserCreateInput[] => {
  return teamMembers.map((user) => user as Prisma.UserCreateInput);
};
