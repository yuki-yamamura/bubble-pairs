export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/((?!activities/.+/published).{1,})'],
};
