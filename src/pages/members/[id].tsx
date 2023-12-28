import { findMember } from '@/features/members/logic/repository';
import { memberSchema } from '@/features/members/validation';
import MemberScreen from '@/screens/MemberProfileScreen';
import { parseJson } from '@/utils';

import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type Params = ParsedUrlQuery & {
  id: string;
};

type Props = {
  serializedMember: string;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const id = parseInt((params as Params).id);
  const result = await findMember(id);

  if (result.type === 'success') {
    const serializedMember = JSON.stringify(result.data);

    return {
      props: {
        serializedMember,
      },
    };
  } else {
    throw result.error;
  }
};

const Page = ({ serializedMember }: Props) => {
  const result = parseJson(serializedMember);
  if (result.type === 'success') {
    const member = memberSchema.parse(result.data);

    return <MemberScreen member={member} />;
  }
};

export default Page;
