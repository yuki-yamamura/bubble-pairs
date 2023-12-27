import axios from 'axios';
import useSWR from 'swr';

const Page = () => {
  const { data } = useSWR('/api/hello', async (url: string) => {
    const res = await axios.get<{ data: { name: string } }>(url);

    return res.data;
  });

  return data && <div>{data.data.name}</div>;
};

export default Page;
