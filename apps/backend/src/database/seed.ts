import { BusinessUnitType, PrismaClient } from '@core/db';
import { v5 as uuid } from 'uuid';

export const prisma = new PrismaClient();
export const NAME_SPACE = 'ecfd24b0-e77d-49a7-a8d6-dd01b7d9c588';

export function uuidFromString(name: string) {
  return uuid(name, NAME_SPACE);
}

async function main() {
  const userBody = {
    firstName: 'no-reply',
    lastName: 'no-reply'
  };
  await prisma.user.upsert({
    where: { id: uuidFromString('no-reply@portal.com') },
    update: { ...userBody },
    create: {
      id: uuidFromString('no-reply@portal.com'),
      loginEmail: 'no-reply@portal.com',
      ...userBody
    }
  });

  const businessUnitBody = {
    type: BusinessUnitType.COMPANY,
    name: 'Base Application',
    description: 'Top level business unit for the application'
  };
  await prisma.businessUnit.upsert({
    where: { id: uuidFromString(businessUnitBody.name) },
    update: { ...businessUnitBody },
    create: { ...businessUnitBody }
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
