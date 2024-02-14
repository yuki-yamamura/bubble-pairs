import { placeSchema } from '@/features/places/validation';
import { schemaForType } from '@/lib/zod';
import { type Prisma } from '@prisma/client';
import { z } from 'zod';

export type ActivityUpdateSchemaType = z.infer<typeof activityUpdateSchema>;

export type ActivityCreateSchema = z.infer<typeof activityCreateSchema>;

export const activitySchema = schemaForType<
  Prisma.ActivityGetPayload<{
    include: {
      place: true;
    };
  }>
>()(
  z.object({
    id: z.string(),
    ownerId: z.string(),
    placeId: z.string(),
    createdAt: z.coerce.date(),
    isOpen: z.boolean(),
    place: placeSchema,
  }),
);

export const activityCreateSchema = z.object({
  participants: z
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
