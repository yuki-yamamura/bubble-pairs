import prisma from '@/lib/prisma';
import { withResult } from '@/lib/prisma/withResult';

import type { Game } from '@/types/models/Game';
import type { Result } from '@/types/Result';
import type { Prisma } from '@prisma/client';

export const createGame = (
  data: Prisma.GameCreateInput,
): Promise<Result<Game>> => {
  return withResult(() =>
    prisma.game.create({
      data,
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
        resters: {
          include: {
            participant: true,
          },
        },
      },
    }),
  )();
};

export const findGameById = (id: Game['id']): Promise<Result<Game | null>> => {
  return withResult(() =>
    prisma.game.findUnique({
      where: { id },
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
        resters: {
          include: {
            participant: true,
          },
        },
      },
    }),
  )();
};

export const deleteGameById = (id: Game['id']): Promise<Result<Game>> => {
  return withResult(() =>
    prisma.game.delete({
      where: { id },
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
        resters: {
          include: {
            participant: true,
          },
        },
      },
    }),
  )();
};
