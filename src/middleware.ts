import { withAuth } from 'next-auth/middleware';

export default withAuth({
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
