import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';

export type ActivityUpdateSchemaType = z.infer<typeof activityUpdateSchema>;

export type ActivityCreateSchemaType = z.infer<typeof activityCreateSchema>;

export const activityCreateSchema = z.object({
  participants: z
    .array(
      z.object({
        memberId: z.string(),
      }),
    )
    .min(2),
  placeId: z.string(),
  isOpen: z.boolean(),
});

export const activityUpdateSchema = schemaForType<
  Pick<Prisma.ActivityUpdateInput, 'isOpen'>
>()(
  z.object({
    isOpen: z.boolean(),
  }),
);
