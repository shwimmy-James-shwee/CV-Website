// import prisma from './prismaClient';
import { InvocationContext } from '@azure/functions';
// import { queueEmail, addEmailToQueue } from "./azureStorageQueue";

export const notificationRunner = async (runFrequency: null | 'Hourly', context: InvocationContext) => {
  // communicate db, get actions and summarise them to feed to user in emails
  context.log(`${runFrequency || 'RealTime'} notification as been processed`);
};
