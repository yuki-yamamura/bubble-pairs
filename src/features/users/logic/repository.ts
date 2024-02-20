import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

import type { Result } from '@/types/Result';
import type { User } from '@prisma/client';

const prisma = new PrismaClient();

export const deleteUserById = (id: User['id']): Promise<Result<User>> => {
  return withResult(() =>
    prisma.user.delete({
      where: { id },
    }),
  )();
};
