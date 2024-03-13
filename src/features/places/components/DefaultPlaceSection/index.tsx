import { useDefaultPlaceForm } from './useDefaultPlaceForm';
import Button from '@/components/Button';
import Select from '@/components/form/Select';
import SectionCard from '@/components/SectionCard';
import { Form, FormField, FormItem } from '@/components/ui/form';
import { useState } from 'react';
import toast from 'react-hot-toast';

import type { Options } from '@/types/Options';

const DefaultPlaceSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { currentDefaultPlace, form, isBusy, sortedPlaces, submitHandler } =
    useDefaultPlaceForm();
  const { control } = form;

  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  const handleSaveButtonClick = async () => {
    if (isEditing) {
      await submitHandler();
      setIsEditing(false);
      toast.success('いつも使う場所を更新しました。');
    } else {
      setIsEditing(true);
    }
  };

  // make sure that the default place is the first choice in the options.
  const placeOptions: Options = sortedPlaces.map(({ id, name }) => ({
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
        currentDefaultPlace && (
          <div className="pl-[13px] pt-[9px] tracking-normal">
            {currentDefaultPlace.name}
          </div>
        )
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
          {isEditing ? '保存' : currentDefaultPlace ? '変更' : '登録'}
        </Button>
      </div>
    </SectionCard>
  );
};

export default DefaultPlaceSection;
