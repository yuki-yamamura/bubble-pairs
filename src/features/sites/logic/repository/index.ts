import { withResult } from '@/lib/prisma';
import { PrismaClient } from '@prisma/client';

import type { Result } from '@/types/Result';
import type { Prisma, Site } from '@prisma/client';

const prisma = new PrismaClient();

export const createSite = (data: Prisma.SiteCreateInput) => {
  return withResult(() => prisma.site.create({ data }))();
};

export const findAllSites = (): Promise<Result<Site[]>> => {
  return withResult(() => prisma.site.findMany())();
};

export const findSite = (id: number): Promise<Result<Site | null>> => {
  return withResult(() =>
    prisma.site.findUnique({
      where: {
        id,
      },
    }),
  )();
};

export const updateSite = ({
  id,
  ...rest
}: Pick<Site, 'id'> & Prisma.SiteUpdateInput) => {
  return withResult(() =>
    prisma.site.update({
      where: {
        id,
      },
      data: {
        ...rest,
      },
    }),
  )();
};

export const deleteSite = async (id: number): Promise<Result<Site>> => {
  return withResult(() =>
    prisma.site.delete({
      where: {
        id,
      },
    }),
  )();
};
