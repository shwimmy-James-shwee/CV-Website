import { UserRole } from '@prisma/client';

export const userArray = [
  {
    id: 'abc-def-g',
    lastName: 'Doe',
    firstName: 'John',
    loginEmail: 'johndoe@hotmail.com',
    userRoles: [UserRole.ADMINISTRATOR],
  },
  {
    id: 'bcd-def-g',
    lastName: 'Doe2',
    firstName: 'John2',
    loginEmail: 'johndoe2@hotmail.com',
    userRoles: [UserRole.STANDARD_USER],
  },
];
