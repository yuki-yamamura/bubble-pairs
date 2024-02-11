import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getCsrfToken, signIn } from 'next-auth/react';

import type { GetServerSideProps } from 'next';

type Props = {
  csrfToken: string | undefined;
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context,
) => {
  const csrfToken = await getCsrfToken(context);

  return {
    props: { csrfToken },
  };
};
const Page = () => {
  return (
    <form
      onSubmit={() => signIn('email', { email: 'yuki.yamamura@icloud.com' })}
    >
      <Label>
        Email
        <Input />
      </Label>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Page;
