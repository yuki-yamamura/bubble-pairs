import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { Member } from '@prisma/client';

type Props = {
  data: Member[];
  actions: {
    deleteByRowIndex: (index: number) => void;
  };
};

const CandidateTable = ({ data, actions }: Props) => {
  const columns = createColumns(actions);

  return <DataTable columns={columns} data={data} />;
};

export default CandidateTable;
