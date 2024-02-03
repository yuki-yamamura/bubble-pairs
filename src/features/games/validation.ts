import { z } from 'zod';

export type GameCreateSchemaType = z.infer<typeof gameCreateSchema>;

export const gameCreateSchema = z.object({
  activityId: z.number(),
  members: z.array(
    z.object({
      memberId: z.number(),
    }),
  ),
  singlesCount: z.number(),
  doublesCount: z.number(),
});
