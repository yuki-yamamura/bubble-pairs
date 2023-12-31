import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Site } from '@prisma/client';

export const siteFormSchema = schemaForType<
  Omit<Site, 'id' | 'createdAt' | 'updatedAt'>
>()(
  z.object({
    name: z.string().min(1, '名前を入力してください。'),
    courtCount: z.number(),
    isDefault: z.boolean(),
  }),
);

export const siteSchema = siteFormSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type SiteFormType = z.infer<typeof siteFormSchema>;
