import DataTable from '@/components/DataTable';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';

import type { ColumnDef } from '@tanstack/react-table';

type SelectableData<TData extends { id: string }> = {
  value: TData;
  selected: boolean;
};

type Props<TData extends { id: string }, TValue> = React.ComponentPropsWithRef<
  typeof AlertDialog
> & {
  columns: ColumnDef<SelectableData<TData>, TValue>[];
  data: TData[];
  triggerButtonLabel: string;
  cancelButtonLabel: string;
  actionButtonLabel: string;
  dialogTitle?: string;
  dialogDescription?: string;
  setData: (newData: TData[]) => void;
};

const DataPicker = <TData extends { id: string }, TValue>({
  columns,
  data,
  triggerButtonLabel,
  cancelButtonLabel,
  actionButtonLabel,
  dialogTitle,
  dialogDescription,
  setData,
  ...rest
}: Props<TData, TValue>) => {
  const [selectableData, setSelectableData] = useState<SelectableData<TData>[]>(
    [],
  );
  const handleCheckboxClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectableData(
      selectableData.map((data) =>
        data.value.id === e.currentTarget.value
          ? { value: data.value, selected: !data.selected }
          : data,
      ),
    );
  };
  const handleActionButtonClick = () => {
    const selectedData = selectableData
      .filter((item) => item.selected)
      .map((item) => item.value);

    setData(selectedData);
  };

  const checkboxColumn: ColumnDef<{ value: TData; selected: boolean }, TValue> =
    {
      accessorKey: 'selected',
      header: '選択中',
      cell: ({ row }) => {
        const { value, selected } = row.original;

        return (
          <Checkbox
            value={value.id}
            checked={selected}
            onClick={handleCheckboxClick}
          />
        );
      },
    };

  useEffect(() => {
    const defaultSelectableData = data.map((data) => {
      return { value: data, selected: false };
    }) satisfies SelectableData<TData>[];

    setSelectableData(defaultSelectableData);
  }, [data]);

  return (
    <div>
      <AlertDialog {...rest}>
        <AlertDialogTrigger asChild>
          <Button
            variant="link"
            className="max-w-fit text-blue-400"
            disabled={data.length === 0}
          >
            {triggerButtonLabel}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            {dialogTitle && <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>}
            {dialogDescription && (
              <AlertDialogDescription>
                {dialogDescription}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <DataTable
            columns={[checkboxColumn, ...columns]}
            data={selectableData}
          />
          <div className="flex gap-x-4">
            <AlertDialogCancel>{cancelButtonLabel}</AlertDialogCancel>
            <AlertDialogAction onClick={handleActionButtonClick}>
              {actionButtonLabel}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DataPicker;
