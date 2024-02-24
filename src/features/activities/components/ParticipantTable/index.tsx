import { columns } from './columns';
import DataTable from '@/components/DataTable';

import type { Participant } from '@/types/models/Participant';

type Props = {
  data: Participant[];
};

const ParticipantTable = ({ data }: Props) => (
  <DataTable columns={columns} data={data} />
);

export default ParticipantTable;
