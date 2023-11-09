import { PrismaClient } from '@prisma/client';

import type { Member } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllMembers = (): Promise<Member[]> => {
  return prisma.member.findMany();
};
