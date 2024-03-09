import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { Member } from '@prisma/client';

type Props = {
  data: Member[];
  actions: Parameters<typeof createColumns>;
};

const MemberTable = ({ data, actions }: Props) => {
  const columns = createColumns(...actions);

  return <DataTable columns={columns} data={data} />;
};

export default MemberTable;
