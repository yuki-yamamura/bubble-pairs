import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Place, Prisma } from '@prisma/client';

export type PlaceCreateSchemaType = z.infer<typeof placeCreateSchema>;

export const placeSchema = schemaForType<Place>()(
  z.object({
    id: z.string(),
    ownerId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    name: z.string(),
    courtCount: z.number(),
  }),
);

export const placeCreateSchema = schemaForType<
  Omit<Prisma.PlaceCreateInput, 'owner'>
>()(
  z.object({
    name: z.string().min(1, '場所名を入力してください。'),
    courtCount: z.number().min(1, '1 つ以上のコート数を入力してください。'),
  }),
);
