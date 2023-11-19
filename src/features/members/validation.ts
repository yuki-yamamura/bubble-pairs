import { Level, Sex } from '@prisma/client';
import { z } from 'zod';

export const schema = z.object({
  name: z.string().min(1, '名前を入力してください。'),
  kana: z.string().optional(),
  displayName: z.string().optional(),
  sex: z.nativeEnum(Sex),
  level: z.nativeEnum(Level),
  note: z.string().optional(),
});
