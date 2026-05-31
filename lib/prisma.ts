import { PrismaClient } from '@prisma/client';
import path from 'path';

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: `file:${path.join(process.cwd(), 'prisma/dev.db')}`,
      },
    },
  });
};

type GlobalWithPrisma = typeof globalThis & {
  prisma: ReturnType<typeof prismaClientSingleton>;
};

const globalForPrisma = globalThis as GlobalWithPrisma;

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
