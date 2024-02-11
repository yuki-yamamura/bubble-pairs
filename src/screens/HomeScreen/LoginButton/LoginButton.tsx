import { loginSchema } from './validation';
import { Button } from '@/components/ui/button';
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
import axios from 'axios';
import { useForm } from 'react-hook-form';

import type { LoginSchema } from './validation';

export const LoginButton = () => {
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
    await axios.post('/api/auth/signin/email', fieldValues);
    // await signIn('email', fieldValues);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="rounded-3xl">
          はじめる
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            入力したメールアドレスに確認コードを送ります。
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={submitHandler}>
            <FormItem>
              <Input
                placeholder="email@example.com"
                aria-label="メールアドレス"
                {...register('email')}
              />
              {errors.email && (
                <FormMessage>{errors.email.message}</FormMessage>
              )}
            </FormItem>
            <Button type="submit">メールを送信</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
