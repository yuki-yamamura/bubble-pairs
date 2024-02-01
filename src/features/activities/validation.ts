import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';

export type ActivityUpdateSchemaType = z.infer<typeof activityUpdateSchema>;

export const activityUpdateSchema = schemaForType<
  Pick<Prisma.ActivityUpdateInput, 'isOpen'>
>()(
  z.object({
    isOpen: z.boolean(),
  }),
);

export const activityFormSchema = z.object({
  members: z.array(
    z.object({
      memberId: z.number(),
    }),
  ),
  placeId: z.number(),
});

export type ActivityFormType = z.infer<typeof activityFormSchema>;
