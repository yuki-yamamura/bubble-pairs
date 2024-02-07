import { z } from 'zod';

export type GameCreateSchemaType = z.infer<typeof gameCreateSchema>;

export const gameCreateSchema = z
  .object({
    activityId: z.string(),
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
      const courtCount = 3;
      const singlesCount = parseInt(schema.singlesCount);
      const doublesCount = parseInt(schema.doublesCount);

      return courtCount > singlesCount + doublesCount;
    },
    (schema) => {
      const singlesCount = parseInt(schema.singlesCount);
      const doublesCount = parseInt(schema.doublesCount);

      const path =
        singlesCount < doublesCount ? 'doublesCount' : 'singlesCount';

      return {
        message:
          'シングルスとダブルスの合計がコート数以下になる様に変更してください。',
        path: [path],
      };
    },
  )
  .refine(
    (schema) => {
      const { members } = schema;
      const singlesCount = parseInt(schema.singlesCount);
      const doublesCount = parseInt(schema.doublesCount);

      const gameDetailCount = singlesCount * 2 + doublesCount + 4;

      return gameDetailCount <= members.length;
    },
    {
      message: '参加者を追加してください。',
      path: ['members'],
    },
  );
