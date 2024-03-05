import { useDefaultPlaceForm } from './useDefaultPlaceForm';
import { usePlaces } from '../../hooks/usePlaces';
import Button from '@/components/Button';
import Select from '@/components/form/Select';
import SectionCard from '@/components/SectionCard';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { Options } from '@/types/Options';
import type { Place } from '@prisma/client';

const DefaultPlaceSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { places, mutate } = usePlaces();
  // default place must always be only one.
  const defaultPlace = places.find((place) => place.isDefault) as Place;
  const { form, isBusy, submitHandler } = useDefaultPlaceForm({ defaultPlace });
  const { control } = form;

  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  const handleSaveButtonClick = async () => {
    if (isEditing) {
      await submitHandler();
      await mutate();
      setIsEditing(false);
      toast.success('いつも使う場所を更新しました。');
    } else {
      setIsEditing(true);
    }
  };

  const placeOptions: Options = places.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  return (
    <SectionCard
      title="いつも使う場所"
      description="アクティビティの初期値となる場所を登録できます。"
    >
      {isEditing ? (
        <Form {...form}>
          <form className="max-w-xs">
            <FormField
              control={control}
              name="placeId"
              render={({ field }) => (
                <FormItem>
                  <Select
                    options={placeOptions}
                    value={field.value}
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  />
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <div className="pl-[13px] pt-[9px] tracking-normal">
          {defaultPlace.name}
        </div>
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

export default DefaultPlaceSection;
