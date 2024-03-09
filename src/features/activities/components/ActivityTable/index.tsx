import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { Activity } from '@/types/models/Activity';

type Props = {
  data: Activity[];
  actions: Parameters<typeof createColumns>;
};

const ActivityTable = ({ data, actions }: Props) => {
  const columns = createColumns(...actions);

  return <DataTable columns={columns} data={data} />;
};

export default ActivityTable;
