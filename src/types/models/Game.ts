import type { Prisma } from '@prisma/client';

export type Game = Prisma.GameGetPayload<{
  include: {
    activity: {
      include: {
        participants: true;
      };
    };
    gameDetails: {
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
    };
    resters: {
      include: {
        participant: true;
      };
    };
  };
}>;
