import { useUserForm } from '../hooks/useUserForm';
import Button from '@/components/Button';
import SectionCard from '@/components/SectionCard';
import { Form, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { User } from '@prisma/client';

type Props = {
  title: string;
  user: User;
};

const EditEmailSection = ({ title, user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { form, isBusy } = useUserForm();
  const { register, reset } = form;

  const handleCancelButtonClick = () => {
    reset();
    setIsEditing(false);
  };
  const handleSaveButtonClick = () => {
    if (isEditing) {
      // todo: implement the logic to change the email.
      toast('実装されていません。', {
        icon: '🙃',
      });
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <SectionCard title={title}>
      {isEditing ? (
        <Form {...form}>
          <form>
            <FormItem>
              <Input
                type="text"
                defaultValue={user.email}
                className="max-w-xs text-base"
                {...register('email')}
              />
            </FormItem>
          </form>
        </Form>
      ) : (
        <div className="pl-[13px] pt-[9px] tracking-normal">{user.email}</div>
      )}
      <div className="mt-4 flex justify-end gap-x-2">
        {isEditing && (
          <Button variant="outline" onClick={handleCancelButtonClick}>
            キャンセル
          </Button>
        )}
        <Button
          isBusy={isBusy}
          variant="outline"
          onClick={handleSaveButtonClick}
        >
          {isEditing ? '保存' : '変更'}
        </Button>
      </div>
    </SectionCard>
  );
};

export default EditEmailSection;
