import { schemaForType } from '@/lib/zod';
import { z } from 'zod';

import type { Place, Prisma } from '@prisma/client';

export type PlaceCreateSchema = z.infer<typeof placeCreateSchema>;

export type PlaceUpdateSchema = z.infer<typeof placeUpdateSchema>;

export const placeSchema = schemaForType<Place>()(
  z.object({
    id: z.string(),
    ownerId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    name: z.string().min(1),
    courtCount: z.number().positive(),
  }),
);

export const placeCreateSchema = schemaForType<
  Pick<Prisma.PlaceCreateInput, 'name' | 'courtCount'>
>()(
  z.object({
    name: z.string().min(1, '場所名を入力してください。'),
    courtCount: z.number().positive('1 以上のコート数を入力してください。'),
  }),
);

export const placeUpdateSchema = schemaForType<
  Pick<Prisma.PlaceUpdateInput, 'name' | 'courtCount'>
>()(
  z.object({
    name: z.string().min(1, '場所名を入力してください。').optional(),
    courtCount: z
      .number()
      .positive('1 以上のコート数を入力してください。')
      .optional(),
  }),
);
