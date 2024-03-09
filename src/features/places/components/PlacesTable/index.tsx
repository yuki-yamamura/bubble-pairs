import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { Place } from '@prisma/client';

type Props = {
  data: Place[];
  actions: Parameters<typeof createColumns>;
};

const PlaceTable = ({ data, actions }: Props) => {
  const columns = createColumns(...actions);

  return <DataTable columns={columns} data={data} />;
};

export default PlaceTable;
