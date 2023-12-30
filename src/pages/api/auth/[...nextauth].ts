import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth/next';
import EmailProvider from 'next-auth/providers/email';

import type { AuthOptions } from 'next-auth';

if (!process.env.EMAIL_SERVER || !process.env.EMAIL_FROM) {
  throw new Error('some of the environment variable not found');
}

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
};

export default NextAuth(authOptions);
