import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized: ({ req: { cookies } }) => {
      return cookies.has('next-auth.session-token');
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
});

export const config = {
  matcher: ['/members/:path*', '/activities/:path*', '/settings/:path*'],
};
