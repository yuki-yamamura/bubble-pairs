import type { NextApiRequest, NextApiResponse } from 'next';
import type { z, ZodSchema } from 'zod';

export const withZod = <
  T extends ZodSchema<
    | {
        query: Partial<{ [key: string]: string | string[] }>;
      }
    | {
        body: unknown;
      }
    | {
        query: Partial<{ [key: string]: string | string[] }>;
        body: unknown;
      }
  >,
>(
  schema: T,
  handler: (
    request: Omit<NextApiRequest, 'query' | 'body'> & z.infer<T>,
    response: NextApiResponse,
  ) => unknown | Promise<unknown>,
) => {
  return (request: NextApiRequest, response: NextApiResponse) => {
    schema.parse(request);
    const { success } = schema.safeParse(request);
    if (!success) {
      response.status(400).end();
    }

    return handler(request, response);
  };
};
