import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Site } from '@prisma/client';

export const siteFormSchema = schemaForType<
  Omit<Site, 'id' | 'createdAt' | 'updatedAt'>
>()(
  z.object({
    name: z.string().min(1),
    courtCount: z.number(),
    isDefault: z.boolean(),
  }),
);
