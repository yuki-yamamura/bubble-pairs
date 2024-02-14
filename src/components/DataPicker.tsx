import Button from '@/components/Button';
import DataTable from '@/components/DataTable';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useState } from 'react';

import type { SelectableData } from '@/types/SelectableData';
import type { ColumnDef } from '@tanstack/react-table';

type Props<TData extends { id: string }> = React.ComponentPropsWithoutRef<
  typeof Dialog
> & {
  columns: ColumnDef<SelectableData<TData>, unknown>[];
  data: TData[];
  triggerButtonLabel: string;
  actionButtonLabel: string;
  dialogTitle?: string;
  dialogDescription?: string;
  setData: (selectedData: TData[]) => void;
};

const DataPicker = <TData extends { id: string }>({
  columns,
  data,
  triggerButtonLabel,
  actionButtonLabel,
  dialogTitle,
  dialogDescription,
  setData,
  ...rest
}: Props<TData>) => {
  const initialData: SelectableData<TData>[] = data.map((model) => ({
    model,
    isSelected: false,
  }));
  const [selectableData, setSelectableData] =
    useState<SelectableData<TData>[]>(initialData);

  const handleCheckboxClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectableData(
      selectableData.map((item) =>
        // toggle whether or not the item is selected.
        item.model.id === e.currentTarget.value
          ? { ...item, isSelected: !item.isSelected }
          : item,
      ),
    );
  };
  const handleActionButtonClick = () => {
    const selectedModels = selectableData
      .filter((item) => item.isSelected)
      .map((item) => item.model);

    setData(selectedModels);
  };

  const reset = () => {
    setSelectableData(initialData);
  };
  const selectAll = () => {
    setSelectableData(data.map((model) => ({ model, isSelected: true })));
  };
  const toggleCheck = () => {
    if (isEverySelected) {
      reset();
    } else {
      selectAll();
    }
  };
  const isEverySelected = selectableData.every((item) => item.isSelected);

  const checkboxColumn: ColumnDef<SelectableData<TData>> = {
    accessorKey: 'selected',
    header: () => {
      return <Checkbox checked={isEverySelected} onClick={toggleCheck} />;
    },
    cell: ({ row }) => {
      const { model, isSelected: selected } = row.original;

      return (
        <Checkbox
          value={model.id}
          checked={selected}
          onClick={handleCheckboxClick}
        />
      );
    },
  };

  return (
    <div>
      <Dialog {...rest} onOpenChange={reset}>
        <DialogTrigger asChild>
          <Button
            disabled={data.length === 0}
            variant="link"
            className="max-w-fit p-0 text-blue-400"
          >
            {triggerButtonLabel}
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col">
          {(dialogTitle || dialogDescription) && (
            <DialogHeader className="self-center">
              {dialogTitle && <DialogTitle>{dialogTitle}</DialogTitle>}
              {dialogDescription && (
                <DialogDescription>{dialogDescription}</DialogDescription>
              )}
            </DialogHeader>
          )}
          <DataTable
            columns={[checkboxColumn, ...columns]}
            data={selectableData}
          />
          <DialogClose asChild>
            <Button
              type="button"
              onClick={handleActionButtonClick}
              variant="outline"
              className="self-end"
            >
              {actionButtonLabel}
            </Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataPicker;
