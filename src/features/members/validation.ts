import { schemaForType } from '@/lib/react-hook-form';
import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

import type { MemberWithoutMeta } from './types/MemberWithoutMeta';

export type Schema = z.infer<typeof schema>;

export const schema = schemaForType<MemberWithoutMeta>()(
  z.object({
    name: z.string().min(1, '名前を入力してください。'),
    kana: z.string().nullable(),
    displayName: z.string().nullable(),
    sex: z.nativeEnum(Sex),
    level: z.nativeEnum(Level),
    note: z.string().nullable(),
  }),
);
