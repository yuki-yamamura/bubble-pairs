import { calculateTotalPlayers } from './logic/utils';
import { activitySchema } from '@/features/activities/validation';
import { z } from 'zod';

export type GameCreateSchemaType = z.infer<typeof gameCreateSchema>;

export const gameCreateSchema = z
  .object({
    activity: activitySchema,
    members: z.array(
      z.object({
        memberId: z.string(),
      }),
    ),
    singlesCount: z.string(),
    doublesCount: z.string(),
  })
  .refine(
    (schema) => {
      const { courtCount } = schema.activity.place;
      const singlesCount = parseInt(schema.singlesCount);
      const doublesCount = parseInt(schema.doublesCount);

      return singlesCount + doublesCount <= courtCount;
    },
    (schema) => {
      const singlesCount = parseInt(schema.singlesCount);
      const doublesCount = parseInt(schema.doublesCount);

      return {
        message:
          'シングルスとダブルスの合計がコート数以下になる様に変更してください。',
        path: [singlesCount < doublesCount ? 'doublesCount' : 'singlesCount'],
      };
    },
  )
  .refine(
    (schema) => {
      const { members } = schema;
      const singlesCount = parseInt(schema.singlesCount);
      const doublesCount = parseInt(schema.doublesCount);
      const playerCount = calculateTotalPlayers(singlesCount, doublesCount);

      return playerCount <= members.length;
    },
    {
      message: '参加者を追加してください。',
      path: ['members'],
    },
  )
  .refine(
    (schema) => {
      const singlesCount = parseInt(schema.singlesCount);
      const doublesCount = parseInt(schema.doublesCount);

      return singlesCount + doublesCount !== 0;
    },
    { message: '試合数を入力してください。', path: ['doublesCount'] },
  );
