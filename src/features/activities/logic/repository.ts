import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

import type { Activity } from '@/types/models/Activity';
import type { Result } from '@/types/Result';
import type { Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createActivity = (
  data: Prisma.ActivityCreateInput,
): Promise<Result<Activity>> => {
  return withResult(() =>
    prisma.activity.create({
      data,
      include: {
        participants: {
          include: {
            member: true,
          },
        },
        place: true,
        games: {
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
        },
      },
    }),
  )();
};

export const findAllActivities = (
  where: Prisma.ActivityWhereInput,
): Promise<Result<Activity[]>> => {
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
        },
      },
      where,
      orderBy: [{ createdAt: 'desc' }],
    }),
  )();
};

export const findActivityById = (
  id: Activity['id'],
): Promise<Result<Activity | null>> => {
  return withResult(() =>
    prisma.activity.findUnique({
      where: { id },
      include: {
        participants: {
          include: {
            member: true,
          },
        },
        place: true,
        games: {
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
        },
      },
    }),
  )();
};

export const updateActivity = ({
  id,
  ...data
}: Pick<Activity, 'id'> & Prisma.ActivityUpdateInput): Promise<
  Result<Activity>
> => {
  return withResult(() =>
    prisma.activity.update({
      data,
      where: { id },
      include: {
        participants: {
          include: {
            member: true,
          },
        },
        place: true,
        games: {
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
        },
      },
    }),
  )();
};

export const deleteActivityById = (
  id: Activity['id'],
): Promise<Result<Activity>> => {
  return withResult(() =>
    prisma.activity.delete({
      where: { id },
      include: {
        place: true,
        participants: {
          include: {
            member: true,
          },
        },
        games: {
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
        },
      },
    }),
  )();
};
