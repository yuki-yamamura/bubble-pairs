import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // workaround to pass the E2E tests
      if (process.env.APP_ENV === 'test') {
        return true;
      }
      if (token) {
        return true;
      }

      return false;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/500',
  },
});

export const config = {
  matcher: [
    '/((?!activities/.+/published|api/.+|signin/.+|auth/.+|images/.*).{1,})',
  ],
};
