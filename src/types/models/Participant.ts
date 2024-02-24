import type { Prisma } from '@prisma/client';

export type Participant = Prisma.ParticipantGetPayload<{
  include: {
    member: true;
  };
}>;
