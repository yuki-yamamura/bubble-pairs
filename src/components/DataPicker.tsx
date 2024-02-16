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

import type { Model } from '@/types/models/Model';
import type { SelectableData } from '@/types/SelectableData';
import type { DialogProps } from '@radix-ui/react-alert-dialog';
import type { ColumnDef } from '@tanstack/react-table';

type Props<TData extends Model> = DialogProps & {
  columns: ColumnDef<SelectableData<TData>>[];
  data: TData[];
  triggerButtonLabel: string;
  actionButtonLabel: string;
  dialogTitle?: string;
  dialogDescription?: string;
  setData: (selectedData: TData[]) => void;
};

const DataPicker = <TData extends Model>({
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
  const toggleCheck = () => {
    if (isAllDataSelected) {
      reset();
    } else {
      setSelectableData(
        data.map((model) => ({
          model,
          isSelected: true,
        })),
      );
    }
  };

  const isAllDataSelected = selectableData.every((item) => item.isSelected);
  const checkboxColumn: ColumnDef<SelectableData<TData>> = {
    accessorKey: 'selected',
    header: () => {
      return <Checkbox checked={isAllDataSelected} onClick={toggleCheck} />;
    },
    cell: ({ row }) => {
      const { model, isSelected } = row.original;

      return (
        <Checkbox
          value={model.id}
          checked={isSelected}
          aria-labelledby={model.id}
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
