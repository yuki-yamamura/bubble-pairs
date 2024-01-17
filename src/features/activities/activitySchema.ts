import { schemaForType } from '@/lib/zod';
import { z } from 'zod';
import { Activity } from '@prisma/client';

const activitySchema = schemaForType<Activity>()(
  z.object({
    id: z.number(),
    ownerId: z.string(),
    createdAt: z.date(),
    isOpen: z.boolean(),
  }),
);
