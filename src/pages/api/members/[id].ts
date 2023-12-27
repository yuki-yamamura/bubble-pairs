import {
  deleteMember,
  updateMember,
} from '@/features/members/logic/repository';
import { memberFormSchema } from '@/features/members/validation';
import { z } from 'zod';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const bodyResult = memberFormSchema.safeParse(request.body);
  const { id } = request.query;
  const queryResult = z.string().safeParse(id);

  // validation for a query parameter
  if (!queryResult.success) {
    return response.status(400).json({ error: 'Invalid request' });
  }

  // update a member
  if (request.method === 'PUT') {
    if (!bodyResult.success) {
      return response.status(400).json({ error: 'Invalid request' });
    }

    const updateInput = {
      id: parseInt(queryResult.data),
      ...bodyResult.data,
    };
    await updateMember(updateInput);

    return response.status(204).end();
  }

  // delete a member
  if (request.method === 'DELETE') {
    const deleteInput = parseInt(queryResult.data);
    await deleteMember(deleteInput);

    return response.status(204).end();
  }
};

export default handler;
