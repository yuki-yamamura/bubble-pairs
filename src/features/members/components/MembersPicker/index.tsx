import { columns } from './columns';
import DataPicker from '@/components/DataPicker';

import type { Member } from '@prisma/client';

type Props = {
  members: Member[];
  updateMembers: (addedMembers: Member[]) => void;
};
const MembersPicker = ({ members, updateMembers }: Props) => {
  return (
    <DataPicker
      columns={columns}
      data={members}
      triggerButtonLabel="参加者を追加..."
      actionButtonLabel="参加者を追加"
      dialogDescription="参加者を選択してください。"
      setData={updateMembers}
    />
  );
};

export default MembersPicker;
