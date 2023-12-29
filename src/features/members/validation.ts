import { schemaForType } from '@/lib/zod';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { Member } from '@prisma/client';
import type { Omit } from '@prisma/client/runtime/library';

export const memberFormSchema = schemaForType<
  Omit<Member, 'id' | 'createdAt' | 'updatedAt'>
>()(
  z.object({
    emojiUnicode: z.string().min(4).max(5),
    name: z.string().min(1, '名前を入力してください。'),
    kana: z.string().nullable(),
    displayName: z.string().nullable(),
    sex: z.nativeEnum(Sex),
    level: z.nativeEnum(Level),
    note: z.string().nullable(),
  }),
);

export const memberSchema = memberFormSchema.extend({
  id: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type MemberFormType = z.infer<typeof memberFormSchema>;
