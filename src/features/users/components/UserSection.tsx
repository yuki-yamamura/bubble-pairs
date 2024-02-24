import Button from '@/components/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

import type { User } from '@prisma/client';

type Props = {
  id: 'name' | 'email';
  title: string;
  user: User;
};

const UserSection = ({ id, title, user }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleSaveButtonClick = () => {
    setIsEditing(true);
  };
  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  return (
    <section id={id}>
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-light">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Input defaultValue={user[id]} className="max-w-xs" />
          ) : (
            <div className="pl-[13px] pt-[9px] tracking-normal">{user[id]}</div>
          )}
          <div className="mt-4 flex justify-end gap-x-2">
            {isEditing && (
              <Button variant="outline" onClick={handleCancelButtonClick}>
                キャンセル
              </Button>
            )}
            <Button variant="outline" onClick={handleSaveButtonClick}>
              {isEditing ? '保存' : '変更'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default UserSection;
