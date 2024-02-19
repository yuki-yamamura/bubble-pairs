import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

import type { Result } from '@/types/Result';
import type { Place, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const createPlace = (
  data: Prisma.PlaceCreateInput,
): Promise<Result<Place>> => {
  return withResult(() => prisma.place.create({ data }))();
};

export const findAllPlaces = (): Promise<Result<Place[]>> => {
  return withResult(() => prisma.place.findMany())();
};

export const findPlaceById = (
  id: Place['id'],
): Promise<Result<Place | null>> => {
  return withResult(() =>
    prisma.place.findUnique({
      where: { id },
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

export const deletePlaceById = (id: Place['id']): Promise<Result<Place>> => {
  return withResult(() =>
    prisma.place.delete({
      where: { id },
    }),
  )();
};
