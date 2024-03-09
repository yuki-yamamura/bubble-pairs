import { createColumns } from './columns';
import DataTable from '@/components/DataTable';

import type { Game } from '@/types/models/Game';

type Props = {
  data: Game[];
  actions: Parameters<typeof createColumns>;
};

const GameTable = ({ data, actions }: Props) => {
  const columns = createColumns(...actions);

  return <DataTable columns={columns} data={data} />;
};

export default GameTable;
