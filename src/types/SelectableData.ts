/**
 * Data type that is supposed to handle within the DataPicker component.
 */
export type SelectableData<TModel extends { id: string }> = {
  model: TModel;
  isSelected: boolean;
};
