import axios from 'axios';
import useSWR from 'swr';

import type { GetResponseData } from '@/pages/api/sites';
import type { Site } from '@prisma/client';

const Page = () => {
  const { data } = useSWR<GetResponseData>('/api/sites', (url: string) => {
    return axios.get<{ sites: Site[] }>(url).then((response) => response.data);
  });

  return (
    <>
      <div>Sites</div>
      <ul>{data?.sites.map((site) => <li key={site.id}>{site.name}</li>)}</ul>
    </>
  );
};

export default Page;
