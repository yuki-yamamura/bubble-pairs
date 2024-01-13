import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Activity } from '@prisma/client';

const activitySchema = schemaForType<Activity>()(
  z.object({
    id: z.number(),
    ownerId: z.string(),
    createdAt: z.date(),
    isOpen: z.boolean(),
  }),
);

export const activityFormSchema = activitySchema
  .omit({
    id: true,
    ownerId: true,
    createdAt: true,
  })
  .extend({
    memberIds: z.array(z.number()),
  });

export type ActivityFormType = z.infer<typeof activityFormSchema>;
