import prisma from '../prismaClient';

describe('prismaClient', () => {
  it('should create an instance of PrismaClient', () => {
    expect(prisma).toBeInstanceOf(Object);
    expect(prisma).toBeDefined();
  });
});
