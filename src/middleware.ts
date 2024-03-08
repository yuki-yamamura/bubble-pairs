export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/members/:path*', '/activities/:path*', '/settings/:path*'],
};
