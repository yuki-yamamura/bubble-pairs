import { z } from 'zod';

export const gameFormSchema = z.object({
  activityId: z.number(),
  members: z.array(
    z.object({
      memberId: z.number(),
    }),
  ),
  singlesCount: z.number(),
  doublesCount: z.number(),
});

export type GameFormType = z.infer<typeof gameFormSchema>;
