import { deleteUserById } from '@/features/users/logic/repository';
import { authOptions } from '@/lib/next-auth';
import { getServerSession } from 'next-auth';

import type { NextApiHandler } from 'next';

const handleDelete: NextApiHandler = async (request, response) => {
  const session = await getServerSession(request, response, authOptions);
  if (!session) {
    response.end(401);

    return;
  }

  console.log({ session });

  const result = await deleteUserById(session.user.id);
  if (result.type === 'success') {
    response.status(204).end();
  } else {
    console.error(result.error);
    response.status(400).end();
  }
};

const handler: NextApiHandler = (request, response) => {
  switch (request.method) {
    case 'DELETE':
      return handleDelete(request, response);
  }
};

export default handler;
