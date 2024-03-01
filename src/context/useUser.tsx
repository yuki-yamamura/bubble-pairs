import { useSession } from 'next-auth/react';
import { createContext, useContext } from 'react';

import type { User } from '@prisma/client';

type UserContextType = {
  user: User;
  updateUser: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: React.PropsWithChildren) => {
  const { data: session, update: updateUser, status } = useSession();

  if (status === 'loading') {
    return null;
  }

  // since all the pages in this repo are protected by the middleware, session must not be null.
  // so if the app throw an error caused of failing a session, that will be a bug.
  const value = session ? { user: session.user, updateUser } : null;

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within UserProvider.');
  }

  return context;
};
