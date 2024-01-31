import type { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  /**
   * An interface to extend the default session so that it includes user id.
   * see: https://next-auth.js.org/getting-started/typescript#extend-default-interface-properties
   */
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}
