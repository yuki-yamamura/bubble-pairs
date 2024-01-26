import { Button } from '@/components/ui/button';
import { signIn } from 'next-auth/react';

const LoginButton = () => {
  const handleClick = () => signIn();

  return (
    <Button type="button" onClick={handleClick} className="rounded-3xl">
      はじめる
    </Button>
  );
};

export default LoginButton;
