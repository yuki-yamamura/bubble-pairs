import { schemaForType } from '@/lib/zod';
import { type Prisma } from '@prisma/client';
import { z } from 'zod';

export type ActivityUpdateSchemaType = z.infer<typeof activityUpdateSchema>;

export type ActivityCreateSchema = z.infer<typeof activityCreateSchema>;

export const activityCreateSchema = z.object({
  memberIds: z
    .array(
      z.object({
        memberId: z.string(),
      }),
    )
    .min(2, { message: '参加者を 2 名以上選択してください。' }),
  placeId: z.string(),
  isOpen: z.boolean(),
});

export const activityUpdateSchema = schemaForType<
  Pick<Prisma.ActivityUpdateInput, 'isOpen'>
>()(
  z.object({
    isOpen: z.boolean(),
  }),
);
