import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

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

export const findAllGames = (): Promise<
  Result<
    Prisma.GameGetPayload<{
      include: {
        gameDetails: {
          include: {
            players: true;
          };
        };
      };
    }>[]
  >
> => {
  return withResult(() =>
    prisma.game.findMany({
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

export const findGameById = (
  id: Prisma.GameIdCompoundUniqueInput,
): Promise<
  Result<Prisma.GameGetPayload<{
    include: {
      gameDetails: {
        include: {
          players: true;
        };
      };
    };
  }> | null>
> => {
  return withResult(() =>
    prisma.game.findUnique({
      where: {
        id,
      },
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

export const deleteGame = (
  id: Prisma.GameIdCompoundUniqueInput,
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
    prisma.game.delete({
      where: {
        id,
      },
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
