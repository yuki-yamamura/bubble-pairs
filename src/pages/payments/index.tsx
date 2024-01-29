import { columns } from './columns';
import DataTable from './data-table';

import type { Payment } from './columns';

const data: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
];

const Page = () => {
  return <DataTable columns={columns} data={data} />;
};

export default Page;
