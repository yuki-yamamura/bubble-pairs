import { findPlaceById } from '@/features/places/logic/repository';
import PlaceDetailScreen from '@/screens/PlaceDetailScreen';

import type { Place } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type Params = ParsedUrlQuery & {
  placeId: string;
};

type Props = {
  place: Place;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { placeId } = params as Params;
  const result = await findPlaceById(placeId);

  if (result.type === 'success') {
    if (!result.data) {
      throw new Error('Place not found!');
    }

    return {
      props: {
        place: result.data,
      },
    };
  } else {
    throw result.error;
  }
};

const Page = ({ place }: Props) => <PlaceDetailScreen place={place} />;

export default Page;
