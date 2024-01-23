import type { Prisma } from '@prisma/client';

export type Activity = Prisma.ActivityGetPayload<{
  include: {
    participants: true;
    place: true;
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
}>;
