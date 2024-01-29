import { columns } from './columns';
import DataTable from '@/components/DataTable';

import type { Activity } from '@/types/models/Activity';

type Props = {
  activities: Activity[];
};

const ActivityTable = ({ activities }: Props) => (
  <DataTable columns={columns} data={activities} />
);

export default ActivityTable;
