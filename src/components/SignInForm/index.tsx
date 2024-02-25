import VerifyRequest from './VerifyRequest';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { useSignInForm } from '@/components/SignInForm/useSignInForm';
import { Form, FormDescription, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/shadcn-ui';
import { ArrowRightIcon } from 'lucide-react';

const SignInForm = () => {
  const { form, formState, register, submitHandler, watch } = useSignInForm();
  const { isSubmitting, isSubmitSuccessful, isValid } = formState;
  const email = watch('email');

  if (isSubmitSuccessful) {
    return <VerifyRequest email={email} />;
  }

  return (
    <div className="flex flex-col items-center">
      <Logo className="mb-12 text-2xl" />
      <Form {...form}>
        <FormDescription className="mb-12 px-8">
          入力したメールアドレスにログイン用のリンクを送ります。
        </FormDescription>
        <form onSubmit={submitHandler} className="relative w-full max-w-xs">
          <FormItem>
            <Input
              placeholder="email@example.com"
              aria-label="メールアドレス"
              disabled={isSubmitting}
              {...register('email')}
              className="max-w-72 overflow-hidden focus-visible:ring-0"
            />
          </FormItem>
          <Button
            type="submit"
            variant={isValid ? 'primary-blue' : 'outline'}
            isBusy={isSubmitting}
            className="absolute -top-2 right-2 h-14 w-14 rounded-full p-0 hover:bg-primary-blue hover:shadow-lg disabled:opacity-100"
          >
            {!isSubmitting && (
              <ArrowRightIcon
                size={20}
                className={cn(
                  'text-slate-300',
                  isValid && 'text-primary-blue-foreground',
                )}
              />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SignInForm;
