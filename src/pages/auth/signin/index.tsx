import { authOptions } from '@/lib/next-auth';
import SignInScreen from '@/screens/auth/signin';
import { getServerSession } from 'next-auth';

import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        permanent: true,
        destination: '/',
      },
    };
  }

  return {
    props: {},
  };
};

const Page = () => <SignInScreen />;

export default Page;
