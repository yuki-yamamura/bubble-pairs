import { loginSchema } from './validation';
import Button from '@/components/Button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import type { LoginSchema } from './validation';

const SignInButton = () => {
  const [isBusy, setIsBusy] = useState(false);
  const form = useForm<LoginSchema>({
    defaultValues: {
      email: '',
    },
    resolver: zodResolver(loginSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  const submitHandler = handleSubmit(async (fieldValues) => {
    setIsBusy(true);
    await signIn('email', fieldValues).then(() => setIsBusy(false));
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="accent" className="rounded-3xl">
          はじめる
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogDescription>
            入力したメールアドレスにログイン用のリンクを送ります。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={submitHandler} className="flex flex-col gap-y-4">
            <FormItem>
              <Input
                placeholder="email@example.com"
                disabled={isBusy}
                aria-label="メールアドレス"
                {...register('email')}
              />
              {errors.email && (
                <FormMessage>{errors.email.message}</FormMessage>
              )}
            </FormItem>
            <Button isBusy={isBusy} type="submit">
              メールを送信
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignInButton;
