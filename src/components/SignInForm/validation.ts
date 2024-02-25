import { z } from 'zod';

export type SignInSchema = z.infer<typeof signInSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
});
