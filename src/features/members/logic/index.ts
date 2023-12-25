import { PrismaClient } from '@prisma/client';

import type { Member, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const findAllMembers = (): Promise<Member[]> => {
  return prisma.member.findMany();
};

export const createMember = async (
  data: Prisma.MemberCreateInput,
): Promise<Member> => {
  const newMember = await prisma.member.create({ data });

  return newMember;
};
