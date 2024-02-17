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
import { CornerDownLeft } from 'lucide-react';
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
    await signIn('email', fieldValues);
    setIsBusy(false);
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="primary-blue">
          はじめる
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex w-full flex-col items-center gap-y-6 py-8">
          <DialogHeader>
            <DialogDescription>
              入力したメールアドレスにログイン用のリンクを送ります。
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={submitHandler} className="relative w-full max-w-xs">
              <FormItem>
                <Input
                  placeholder="email@example.com"
                  aria-label="メールアドレス"
                  disabled={isBusy}
                  {...register('email')}
                  className="focus-visible:ring-0"
                />
                {errors.email && (
                  <FormMessage>{errors.email.message}</FormMessage>
                )}
              </FormItem>
              <Button
                type="submit"
                variant="primary-blue"
                isBusy={isBusy}
                className="absolute right-[-16px] top-[-4px] h-12 w-12 rounded-full p-0"
              >
                {!isBusy && (
                  <CornerDownLeft
                    size={16}
                    className="text-primary-blue-foreground"
                  />
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SignInButton;
