import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { Activity } from '@/types/models/Activity';

type Props = {
  data: Activity[];
  actions: {
    closeActivityById: (id: Activity['id']) => Promise<void>;
    deleteActivityById: (id: Activity['id']) => Promise<void>;
    openActivity: (id: Activity['id']) => Promise<void>;
  };
};

const ActivityTable = ({ data, actions }: Props) => {
  const columns = createColumns(actions);

  return <DataTable columns={columns} data={data} />;
};

export default ActivityTable;
