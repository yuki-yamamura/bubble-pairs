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

  if (data.length === 0) {
    return (
      <div className="p-4">
        <EmptyState
          src="/images/empty-box.png"
          alt="empty-box"
          className="h-40 w-40"
        >
          <p className="text-sm text-slate-400">参加者が選択されていません。</p>
        </EmptyState>
      </div>
    );
  }

  return <DataTable columns={columns} data={data} />;
};

export default CandidateTable;
