import { findPlace } from '@/features/places/logic/repository';
import { placeCreateSchema } from '@/features/places/validation';
import PlaceScreen from '@/screens/PlaceScreen';

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
  const { id } = params as Params;
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
  const result = serializedPlace;
  if (result.type === 'success') {
    const place = placeCreateSchema.parse(result.data);

    return <PlaceScreen place={place} />;
  }
};

export default Page;
