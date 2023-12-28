import { schemaForType } from '@/lib/zod';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { MemberWithoutMeta } from '@/features/members/types/MemberWithoutMeta';
import type { Member } from '@prisma/client';

export type MemberFormSchema = z.infer<typeof memberFormSchema>;

export const memberSchema = schemaForType<Member>()(
  z.object({
    id: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string(),
    kana: z.string().nullable(),
    displayName: z.string().nullable(),
    sex: z.nativeEnum(Sex),
    level: z.nativeEnum(Level),
    avatar: z.string(),
    note: z.string().nullable(),
  }),
);

export const memberFormSchema = schemaForType<MemberWithoutMeta>()(
  z.object({
    avatar: z.string(),
    name: z.string().min(1, '名前を入力してください。'),
    kana: z.string().nullable(),
    displayName: z.string().nullable(),
    sex: z.nativeEnum(Sex),
    level: z.nativeEnum(Level),
    note: z.string().nullable(),
  }),
);
