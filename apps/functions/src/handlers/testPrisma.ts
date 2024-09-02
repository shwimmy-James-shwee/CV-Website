import { app, InvocationContext, Timer } from '@azure/functions';
import prisma from '../services/prismaClient';

export async function testPrisma(timer: Timer, context: InvocationContext): Promise<void> {
  const businessUnits = await prisma.businessUnit.findMany();
  context.log(JSON.stringify(businessUnits));
}

app.timer('testPrisma', {
  schedule: process.env.TIME_TRIGGER || '*/10 * * * * *', // every 10 second
  handler: testPrisma
});
