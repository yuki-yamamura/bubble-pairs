import { z } from 'zod';

export type GameCreateSchemaType = z.infer<typeof gameCreateSchema>;

export const gameCreateSchema = z.object({
  activityId: z.string(),
  members: z.array(
    z.object({
      memberId: z.string(),
    }),
  ),
  singlesCount: z.number(),
  doublesCount: z.number(),
});
