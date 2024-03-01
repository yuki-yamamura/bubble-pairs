import { useUserForm } from '../hooks/useUserForm';
import Button from '@/components/Button';
import SectionCard from '@/components/SectionCard';
import { Form, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import type { User } from '@prisma/client';

type Props = {
  title: string;
  user: User;
};

const EditEmailSection = ({ title, user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { form, isBusy, submitHandler } = useUserForm();
  const { register, reset } = form;

  const handleCancelButtonClick = () => {
    reset();
    setIsEditing(false);
  };
  const handleSaveButtonClick = async () => {
    if (isEditing) {
      await submitHandler();
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
                defaultValue={user.name}
                className="max-w-xs text-base"
                {...register('name')}
              />
            </FormItem>
          </form>
        </Form>
      ) : (
        <div className="pl-[13px] pt-[9px] tracking-normal">{user.name}</div>
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
