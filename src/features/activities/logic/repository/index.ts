import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

import type { Activity } from '@/types/models/Activity';
import type { Result } from '@/types/Result';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createActivity = (
  data: Prisma.ActivityUncheckedCreateInput,
): Promise<
  Result<
    Prisma.ActivityGetPayload<{
      include: {
        place: true;
        participants: true;
      };
    }>
  >
> => {
  return withResult(() =>
    prisma.activity.create({
      data,
      include: {
        place: true,
        participants: true,
      },
    }),
  )();
};

export const findAllActivities = (): Promise<Result<Activity[]>> => {
  return withResult(() =>
    prisma.activity.findMany({
      include: {
        participants: {
          include: {
            member: true,
          },
        },
        place: true,
        games: {
          include: {
            gameDetails: {
              include: {
                players: true,
              },
            },
          },
        },
      },
    }),
  )();
};

export const findActivityById = (
  id: number,
): Promise<Result<Activity | null>> => {
  return withResult(() =>
    prisma.activity.findUnique({
      where: {
        id,
      },
      include: {
        participants: {
          include: {
            member: true,
          },
        },
        place: true,
        games: {
          include: {
            gameDetails: {
              include: {
                players: true,
              },
            },
          },
        },
      },
    }),
  )();
};

export const updateActivity = ({
  id,
  ...rest
}: { id: number } & Prisma.ActivityUpdateInput): Promise<Result<Activity>> => {
  return withResult(() =>
    prisma.activity.update({
      data: {
        ...rest,
      },
      where: {
        id,
      },
      include: {
        participants: {
          include: {
            member: true,
          },
        },
        place: true,
        games: {
          include: {
            gameDetails: {
              include: {
                players: true,
              },
            },
          },
        },
      },
    }),
  )();
};

export const deleteActivity = (id: number): Promise<Result<Activity>> => {
  return withResult(() =>
    prisma.activity.delete({
      where: {
        id,
      },
      include: {
        place: true,
        participants: {
          include: {
            member: true,
          },
        },
        games: {
          include: {
            gameDetails: {
              include: {
                players: true,
              },
            },
          },
        },
      },
    }),
  )();
};
