import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import prisma from '../services/prismaClient';

export async function testPrisma(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
  const businessUnits = await prisma.businessUnit.findMany();
  context.log(JSON.stringify(businessUnits));
  return {
    jsonBody: {
      message: JSON.stringify(businessUnits),
    },
  };
}

app.http('testPrisma', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: testPrisma,
});
