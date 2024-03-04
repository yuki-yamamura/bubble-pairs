import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { Member } from '@prisma/client';

type Props = {
  data: Member[];
  actions: {
    deleteMember: (member: Member) => Promise<void>;
    openMemberDetail: (memberId: Member['id']) => Promise<void>;
  };
};

const MemberTable = ({ data, actions }: Props) => {
  const columns = createColumns(actions);

  return <DataTable columns={columns} data={data} />;
};

export default MemberTable;
