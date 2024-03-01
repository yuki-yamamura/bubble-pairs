import { schemaForType } from '@/lib/zod';
import { type Prisma } from '@prisma/client';
import { z } from 'zod';

export type SignInSchema = z.infer<typeof signInSchema>;

export type UserUpdateSchema = z.infer<typeof userUpdateSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
});

export const userUpdateSchema = schemaForType<Prisma.UserUpdateInput>()(
  z.object({
    name: z.string().min(1, '表示名を入力してください。'),
    email: z.string().email(),
  }),
);
