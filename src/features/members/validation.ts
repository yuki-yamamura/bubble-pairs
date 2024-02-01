import { schemaForType } from '@/lib/zod';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { Prisma } from '@prisma/client';

export type MemberCreateSchemaType = z.infer<typeof memberCreateSchema>;

export type MemberUpdateSchemaType = z.infer<typeof memberUpdateSchema>;

export type MemberFilterType = z.infer<typeof memberFilterSchema>;

export type MemberSortType = z.infer<typeof memberSortSchema>;

export const memberCreateSchema = schemaForType<
  Omit<Prisma.MemberCreateInput, 'owner'>
>()(
  z.object({
    name: z.string().min(1, '名前を入力してください。'),
    kana: z.string().nullable().optional(),
    displayName: z.string().nullable().optional(),
    sex: z.nativeEnum(Sex),
    level: z.nativeEnum(Level),
    note: z.string().nullable().optional(),
    emojiUnicode: z.string(),
  }),
);

export const memberUpdateSchema = schemaForType<Prisma.MemberUpdateInput>()(
  z.object({
    name: z.string().min(1, '名前を入力してください。').optional(),
    kana: z.string().nullable().optional(),
    displayName: z.string().nullable().optional(),
    sex: z.nativeEnum(Sex).optional(),
    level: z.nativeEnum(Level).optional(),
    note: z.string().nullable().optional(),
    emojiUnicode: z.string().optional(),
  }),
);

export const memberFilterSchema = z.object({
  sexes: z.array(z.nativeEnum(Sex)),
  levels: z.array(z.nativeEnum(Level)),
});

export const memberSortSchema = z.object({
  sortKey: z.enum(['createdAt', 'level', 'sex']),
});
