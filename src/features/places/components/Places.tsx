import axios from 'axios';
import Link from 'next/link';
import useSWR from 'swr';

import type { GetResponseData } from '@/types/api/places';

const Places = () => {
  const { data } = useSWR<GetResponseData>('/api/places', (url: string) => {
    return axios.get<GetResponseData>(url).then((response) => response.data);
  });

  return (
    <ul>
      {data &&
        data.places.map((place) => (
          <li key={place.id}>
            <Link href={`/places/${place.id}`}>{place.name}</Link>
          </li>
        ))}
    </ul>
  );
};

export default Places;
