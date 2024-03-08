import prisma from '@/lib/prisma';
import { withResult } from '@/lib/prisma/withResult';

import type { Result } from '@/types/Result';
import type { Prisma, User } from '@prisma/client';

export const findUser = (
  where: Prisma.UserWhereUniqueInput,
): Promise<Result<User | null>> => {
  return withResult(() =>
    prisma.user.findUnique({
      where,
    }),
  )();
};

export const updateUser = ({
  id,
  ...data
}: Pick<User, 'id'> & Prisma.UserUpdateInput): Promise<Result<User>> => {
  return withResult(() =>
    prisma.user.update({
      where: { id },
      data,
    }),
  )();
};

export const deleteUserById = (id: User['id']): Promise<Result<User>> => {
  return withResult(() =>
    prisma.user.delete({
      where: { id },
    }),
  )();
};
