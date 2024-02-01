import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { Activity } from '@/types/models/Activity';

type Props = {
  data: Activity[];
  actions: {
    closeActivity: (id: number) => Promise<void>;
    deleteActivity: (id: number) => Promise<void>;
    openActivity: (id: number) => Promise<void>;
  };
};

const ActivityTable = ({ data, actions }: Props) => {
  const columns = createColumns(actions);

  return <DataTable columns={columns} data={data} />;
};

export default ActivityTable;
