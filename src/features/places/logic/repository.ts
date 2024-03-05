import prisma from '@/lib/prisma';
import { withResult } from '@/lib/prisma/withResult';

import type { Result } from '@/types/Result';
import type { Place, Prisma } from '@prisma/client';

export const createPlace = (
  data: Prisma.PlaceCreateInput,
): Promise<Result<Place>> => {
  return withResult(() => prisma.place.create({ data }))();
};

export const findAllPlaces = (
  where: Prisma.PlaceWhereInput,
): Promise<Result<Place[]>> => {
  return withResult(() =>
    prisma.place.findMany({
      where: {
        ...where,
        isDeleted: false,
      },
      orderBy: [{ createdAt: 'desc' }],
    }),
  )();
};

export const findPlaceById = (
  id: Place['id'],
): Promise<Result<Place | null>> => {
  return withResult(() =>
    prisma.place.findUnique({
      where: {
        id,
        isDeleted: false,
      },
    }),
  )();
};

export const updatePlace = ({
  id,
  ...data
}: Pick<Place, 'id'> & Prisma.PlaceUpdateInput): Promise<Result<Place>> => {
  return withResult(() =>
    prisma.place.update({
      where: { id },
      data,
    }),
  )();
};

export const updateDefaultPlace = (
  defaultPlaceId: Place['id'],
): Promise<Result<[Prisma.BatchPayload, Place]>> => {
  return withResult(() =>
    prisma.$transaction([
      prisma.place.updateMany({
        data: {
          isDefault: false,
        },
      }),
      prisma.place.update({
        data: {
          isDefault: true,
        },
        where: {
          id: defaultPlaceId,
        },
      }),
    ]),
  )();
};

export const deletePlaceById = (id: Place['id']): Promise<Result<Place>> => {
  return withResult(() =>
    prisma.place.delete({
      where: { id },
    }),
  )();
};
