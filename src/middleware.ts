export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/((?!articles/.+/published|auth/.*|images/.*).{1,})'],
};
