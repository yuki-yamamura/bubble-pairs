import { sendVerificationRequest } from './sendVerificationRequest';
import { findUser } from '@/features/users/logic/repository';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import EmailProvider from 'next-auth/providers/email';

import type { AuthOptions } from 'next-auth';

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  callbacks: {
    session: async ({ session }) => {
      const result = await findUser({ email: session.user.email });
      if (result.type === 'error' || result.data === null) {
        return session;
      }

      return {
        ...session,
        user: result.data,
      };
    },
  },
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
    error: '/500',
  },
};
