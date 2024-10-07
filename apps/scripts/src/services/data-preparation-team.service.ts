import { Prisma } from '@core/db';

/**
 * Insert team members of project here. Copy and paste the first example
 * and change the fields below with relevant user infomation:
 * @loginEmail
 * @firstName
 * @lastName
 */
export const teamMembers: Prisma.UserCreateInput[] = [
  {
    loginEmail: 'example_email@kpmg.co.nz',
    firstName: 'John',
    lastName: 'Doe',
    isSuperAdmin: true,
  },
];
