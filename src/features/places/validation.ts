import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';

export type PlaceCreateSchema = z.infer<typeof placeCreateSchema>;

export type PlaceUpdateSchema = z.infer<typeof placeUpdateSchema>;

export const placeCreateSchema = schemaForType<
  Omit<Prisma.PlaceCreateInput, 'owner'>
>()(
  z.object({
    name: z.string().min(1, '場所名を入力してください。'),
    courtCount: z.number().positive('1 以上のコート数を入力してください。'),
    isDeleted: z.boolean(),
  }),
);

export const placeUpdateSchema = schemaForType<Prisma.PlaceUpdateInput>()(
  z.object({
    name: z.string().min(1, '場所名を入力してください。').optional(),
    courtCount: z
      .number()
      .positive('1 以上のコート数を入力してください。')
      .optional(),
    isDeleted: z.boolean(),
  }),
);
