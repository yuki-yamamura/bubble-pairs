import { findSite } from '@/features/sites/logic/repository';
import { siteSchema } from '@/features/sites/validation';
import SiteScreen from '@/screens/SiteScreen';
import { parseJson } from '@/utils';

import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type Params = ParsedUrlQuery & {
  id: string;
};

type Props = {
  serializedSite: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const id = parseInt((params as Params).id);
  const result = await findSite(id);

  if (result.type === 'success') {
    const serializedSite = JSON.stringify(result.data);

    return {
      props: {
        serializedSite,
      },
    };
  } else {
    throw result.error;
  }
};

const Page = ({ serializedSite }: Props) => {
  const result = parseJson(serializedSite);
  if (result.type === 'success') {
    const site = siteSchema.parse(result.data);

    return <SiteScreen site={site} />;
  }
};

export default Page;
