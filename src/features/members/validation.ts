import { schemaForType } from '@/lib/zod';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';

export type MemberCreateSchema = z.infer<typeof memberCreateSchema>;

export type MemberUpdateSchema = z.infer<typeof memberUpdateSchema>;

export const memberCreateSchema = schemaForType<
  Omit<Prisma.MemberCreateInput, 'owner'>
>()(
  z.object({
    name: z.string().min(1, '名前を入力してください。'),
    sex: z.nativeEnum(Sex),
    level: z.nativeEnum(Level),
    note: z.string().nullable().optional(),
    emojiUnicode: z.string(),
    isDeleted: z.boolean(),
  }),
);

export const memberUpdateSchema = schemaForType<Prisma.MemberUpdateInput>()(
  z.object({
    name: z.string().min(1, '名前を入力してください。').optional(),
    sex: z.nativeEnum(Sex).optional(),
    level: z.nativeEnum(Level).optional(),
    note: z.string().nullable().optional(),
    emojiUnicode: z.string().optional(),
    isDeleted: z.boolean(),
  }),
);
