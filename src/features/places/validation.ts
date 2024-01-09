import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Place } from '@prisma/client';

export const placeSchema = schemaForType<Place>()(
  z.object({
    id: z.number(),
    ownerId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string().min(1, '場所名を入力してください。'),
    courtCount: z.number().min(1, '1 つ以上のコート数を入力してください。'),
  }),
);

export const placeFormSchema = placeSchema.omit({
  id: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
});

export type PlaceFormType = z.infer<typeof placeFormSchema>;
