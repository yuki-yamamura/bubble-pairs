export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/members/:path*', '/settings/:path*'],
};
