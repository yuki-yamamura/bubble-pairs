import type { Prisma } from '@prisma/client';

export type Activity = Prisma.ActivityGetPayload<{
  include: {
    participants: {
      include: {
        member: true;
      };
    };
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
