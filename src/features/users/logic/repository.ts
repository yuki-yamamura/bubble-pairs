import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

import type { Result } from '@/types/Result';
import type { Prisma, User } from '@prisma/client';

const prisma = new PrismaClient();

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
