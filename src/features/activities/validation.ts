import { z } from 'zod';

export const activityFormSchema = z.object({
  members: z.array(
    z.object({
      memberId: z.number(),
    }),
  ),
  placeId: z.number(),
});

export type ActivityFormType = z.infer<typeof activityFormSchema>;
