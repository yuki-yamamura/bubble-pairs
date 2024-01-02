import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Place } from '@prisma/client';

export const placeSchema = schemaForType<Place>()(
  z.object({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string().min(1, '名前を入力してください。'),
    courtCount: z.number(),
    isDefault: z.boolean(),
  }),
);

export const placeFormSchema = placeSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type PlaceFormType = z.infer<typeof placeFormSchema>;
