import {
  deleteMember,
  findMember,
  updateMember,
} from '@/features/members/logic/repository';
import { memberFormSchema } from '@/features/members/validation';
import { z } from 'zod';

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (request: NextApiRequest, response: NextApiResponse) => {
  const { id } = request.query;
  const queryResult = z.string().safeParse(id);

  // validation for a query parameter
  if (!queryResult.success) {
    return response.status(400).json({ error: 'Invalid request' });
  }

  // read a member
  if (request.method === 'GET') {
    const id = parseInt(queryResult.data);
    const member = await findMember(id);

    console.log('debugger');
    console.log({ id });
    console.log({ member });

    return response.status(200).json({ member });
  }

  // update a member
  if (request.method === 'PUT') {
    const bodyResult = memberFormSchema.safeParse(request.body);
    if (!bodyResult.success) {
      return response.status(400).json({ error: 'Invalid request' });
    }

    const updateInput = {
      id: parseInt(queryResult.data),
      ...bodyResult.data,
    };
    const result = await updateMember(updateInput);

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).end();
    }
  }

  // delete a member
  if (request.method === 'DELETE') {
    const deleteInput = parseInt(queryResult.data);
    const result = await deleteMember(deleteInput);

    if (result.type === 'success') {
      response.status(204).end();
    } else {
      response.status(400).end();
    }
  }
};

export default handler;
