import Button from '@/components/Button';
import { signIn } from 'next-auth/react';

const SignInButton = () => {
  const handleClick = () => {
    void signIn();
  };

  return (
    <Button type="button" variant="primary-blue" onClick={handleClick}>
      はじめる
    </Button>
  );
};

export default SignInButton;
