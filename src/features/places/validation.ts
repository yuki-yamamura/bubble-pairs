import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';

export type PlaceCreateSchemaType = z.infer<typeof placeCreateSchema>;

export const placeCreateSchema = schemaForType<
  Omit<Prisma.PlaceCreateInput, 'owner'>
>()(
  z.object({
    name: z.string().min(1, '場所名を入力してください。'),
    courtCount: z.number().min(1, '1 つ以上のコート数を入力してください。'),
  }),
);
