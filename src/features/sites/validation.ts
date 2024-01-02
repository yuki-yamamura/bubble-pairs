import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Site } from '@prisma/client';

export const siteSchema = schemaForType<Site>()(
  z.object({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string().min(1, '名前を入力してください。'),
    courtCount: z.number(),
    isDefault: z.boolean(),
  }),
);

export const siteFormSchema = siteSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type SiteFormType = z.infer<typeof siteFormSchema>;
