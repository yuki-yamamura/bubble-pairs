import HomeScreen from '@/screens/home';
import { useSession } from 'next-auth/react';

const Page = () => {
  const { data: session } = useSession();

  return <HomeScreen session={session} />;
};

export default Page;
