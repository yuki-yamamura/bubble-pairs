import { z } from 'zod';

export type LoginSchema = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: '有効なメールアドレスを入力してください。' }),
});
