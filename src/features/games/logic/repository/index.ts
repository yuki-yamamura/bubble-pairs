import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

import type { Game } from '@/types/models/Game';
import type { Result } from '@/types/Result';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createGame = (
  data: Prisma.GameCreateInput,
): Promise<
  Result<
    Prisma.GameGetPayload<{
      include: {
        gameDetails: {
          include: {
            players: true;
          };
        };
      };
    }>
  >
> => {
  return withResult(() =>
    prisma.game.create({
      data,
      include: {
        gameDetails: {
          include: {
            players: true,
          },
        },
      },
    }),
  )();
};

export const findAllGames = (): Promise<Result<Game[]>> => {
  return withResult(() =>
    prisma.game.findMany({
      include: {
        activity: {
          include: {
            participants: true,
          },
        },
        gameDetails: {
          include: {
            players: {
              include: {
                participant: {
                  include: {
                    member: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
  )();
};

export const findGameById = (id: string): Promise<Result<Game | null>> => {
  return withResult(() =>
    prisma.game.findUnique({
      where: {
        id,
      },
      include: {
        activity: {
          include: {
            participants: true,
          },
        },
        gameDetails: {
          include: {
            players: {
              include: {
                participant: {
                  include: {
                    member: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
  )();
};

export const deleteGameById = (id: string): Promise<Result<Game>> => {
  return withResult(() =>
    prisma.game.delete({
      where: {
        id,
      },
      include: {
        activity: {
          include: {
            participants: true,
          },
        },
        gameDetails: {
          include: {
            players: {
              include: {
                participant: {
                  include: {
                    member: true,
                  },
                },
              },
            },
          },
        },
      },
    }),
  )();
};
