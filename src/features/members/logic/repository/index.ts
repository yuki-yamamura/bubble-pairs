import { Prisma, PrismaClient } from '@prisma/client';

import type { Result } from '@/types/Result';
import type { Member } from '@prisma/client';

const prisma = new PrismaClient();

export const createMember = async (
  data: Prisma.MemberCreateInput,
): Promise<Member> => {
  const newMember = await prisma.member.create({ data });

  return newMember;
};

export const findAllMembers = (): Promise<Member[]> => {
  return prisma.member.findMany();
};

export const findMember = async (
  id: Prisma.MemberWhereUniqueInput,
): Promise<Result<Member>> => {
  const member = await prisma.member.findUnique({ where: id });

  return member
    ? { type: 'success', data: member }
    : {
        type: 'error',
        error: new Error(`Member not found: id=${id.toString()}`),
      };
};

export const updateMember = async ({
  id,
  ...rest
}: Pick<Member, 'id'> & Prisma.MemberUpdateInput): Promise<Result<Member>> => {
  try {
    const updatedMember = await prisma.member.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    });

    return {
      type: 'success',
      data: updatedMember,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        type: 'error',
        error,
      };
    }

    throw error;
  }
};

export const deleteMember = async (id: number): Promise<Result<undefined>> => {
  try {
    await prisma.member.delete({ where: { id } });

    return {
      type: 'success',
      data: undefined,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return {
        type: 'error',
        error,
      };
    }
    throw error;
  }
};
