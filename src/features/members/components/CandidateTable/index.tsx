import { createColumns } from './columns';
import DataTable from '@/components/DataTable';
import EmptyState from '@/components/EmptyState';

import type { Member } from '@prisma/client';

type Props = {
  data: Member[];
  actions: {
    deleteRowByIndex: (index: number) => void;
  };
};

const CandidateTable = ({ data, actions }: Props) => {
  const columns = createColumns(actions);

  return data.length !== 0 ? (
    <DataTable columns={columns} data={data} />
  ) : (
    <EmptyState
      src="/images/empty-box.png"
      alt="empty-box"
      className="h-40 w-40"
    >
      <p className="text-sm text-slate-400">メンバーが選択されていません。</p>
    </EmptyState>
  );
};

export default CandidateTable;
