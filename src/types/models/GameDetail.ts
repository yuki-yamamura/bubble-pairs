import type { Prisma } from '@prisma/client';

export type GameDetail = Prisma.GameDetailGetPayload<{
  include: {
    players: {
      include: {
        participant: {
          include: {
            member: true;
          };
        };
      };
    };
  };
}>;
