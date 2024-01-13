import { z } from 'zod';

export const gameFormSchema = z.object({
  memberIds: z.array(z.number()),
  singlesCount: z.number(),
  doublesCount: z.number(),
});

export type GameFormType = z.infer<typeof gameFormSchema>;
