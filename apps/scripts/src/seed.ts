import { PrismaClient, User } from '@core/db';
import { generateSignInLog, generateUser, generateUserActivityLog, generateUserNotification } from './mockData';

const prisma = new PrismaClient();

async function generateUsers(numOfUsers: number): Promise<void> {
  for (let i = 0; i < numOfUsers; i++) {
    const userMock = generateUser();
    await prisma.user.create({ data: userMock });
    for (let i = 0; i < 10; i++) {
      const userNotification = generateUserNotification(userMock.id);
      const signInLog = generateSignInLog(userMock.id);
      const UserActivityLog = generateUserActivityLog(userMock.id);
      console.log(userNotification);
    }
  }
}

generateUsers(10);
