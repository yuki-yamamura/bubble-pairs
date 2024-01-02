import { findPlace } from '@/features/places/logic/repository';
import { placeSchema } from '@/features/places/validation';
import PlaceScreen from '@/screens/PlaceScreen';
import { parseJson } from '@/utils';

import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type Params = ParsedUrlQuery & {
  id: string;
};

type Props = {
  serializedPlace: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const id = parseInt((params as Params).id);
  const result = await findPlace(id);

  if (result.type === 'success') {
    const serializedPlace = JSON.stringify(result.data);

    return {
      props: {
        serializedPlace,
      },
    };
  } else {
    throw result.error;
  }
};

const Page = ({ serializedPlace }: Props) => {
  const result = parseJson(serializedPlace);
  if (result.type === 'success') {
    const place = placeSchema.parse(result.data);

    return <PlaceScreen place={place} />;
  }
};

export default Page;
