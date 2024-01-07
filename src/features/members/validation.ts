import { schemaForType } from '@/lib/zod';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { Member } from '@prisma/client';

export const memberSchema = schemaForType<Member>()(
  z.object({
    id: z.number(),
    ownerId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
    name: z.string().min(1, '名前を入力してください。'),
    kana: z.string().nullable(),
    displayName: z.string().nullable(),
    sex: z.nativeEnum(Sex),
    level: z.nativeEnum(Level),
    note: z.string().nullable(),
    emojiUnicode: z.string(),
  }),
);

export const memberFormSchema = memberSchema.omit({
  id: true,
  ownerId: true,
  createdAt: true,
  updatedAt: true,
});

export type MemberFormType = z.infer<typeof memberFormSchema>;
