import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

import type { Result } from '@/types/Result';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createActivity = (
  data: Prisma.ActivityUncheckedCreateInput,
): Promise<
  Result<
    Prisma.ActivityGetPayload<{
      include: {
        participants: true;
      };
    }>
  >
> => {
  return withResult(() =>
    prisma.activity.create({
      data,
      include: {
        participants: true,
      },
    }),
  )();
};

export const findAllActivities = (): Promise<
  Result<
    Prisma.ActivityGetPayload<{
      include: {
        participants: true;
        games: {
          include: {
            gameDetails: {
              include: {
                players: true;
              };
            };
          };
        };
      };
    }>[]
  >
> => {
  return withResult(() =>
    prisma.activity.findMany({
      include: {
        participants: true,
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
): Promise<
  Result<Prisma.ActivityGetPayload<{
    include: {
      participants: true;
      games: {
        include: {
          gameDetails: {
            include: {
              players: true;
            };
          };
        };
      };
    };
  }> | null>
> => {
  return withResult(() =>
    prisma.activity.findUnique({
      where: {
        id,
      },
      include: {
        participants: true,
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
}: { id: number } & Prisma.ActivityUpdateInput): Promise<
  Result<
    Prisma.ActivityGetPayload<{
      include: {
        participants: true;
        games: {
          include: {
            gameDetails: {
              include: {
                players: true;
              };
            };
          };
        };
      };
    }>
  >
> => {
  return withResult(() =>
    prisma.activity.update({
      data: {
        ...rest,
      },
      where: {
        id,
      },
      include: {
        participants: true,
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

export const deleteActivity = (
  id: number,
): Promise<
  Result<
    Prisma.ActivityGetPayload<{
      include: {
        participants: true;
        games: {
          include: {
            gameDetails: {
              include: {
                players: true;
              };
            };
          };
        };
      };
    }>
  >
> => {
  return withResult(() =>
    prisma.activity.delete({
      where: {
        id,
      },
      include: {
        participants: true,
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
