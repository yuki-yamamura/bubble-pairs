import { signIn, signOut, useSession } from 'next-auth/react';

// todo: after considering design for the home page, implement it with authentication.
const Page = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        Authenticated{' '}
        <button type="button" onClick={() => signOut()}>
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div>
      Unauthenticated{' '}
      <button type="button" onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
};

export default Page;
