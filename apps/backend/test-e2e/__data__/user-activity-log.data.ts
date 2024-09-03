import { Prisma } from '@core/db';

export const seedUserActivityLogData = {
  sessionIdentifier: 'abc-def-gg',
  eventStartTime: new Date('2024-04-16'),
  eventEndTime: new Date('2024-04-16'),
  eventDuration: 5000,
  eventUrl: '/faq',
} as Prisma.UserActivityLogCreateInput;
