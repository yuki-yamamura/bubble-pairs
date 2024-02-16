import type { Model } from '@/types/models/Model';

export type SelectableData<TModel extends Model> = {
  model: TModel;
  isSelected: boolean;
};
