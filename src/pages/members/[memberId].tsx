import { findMemberById } from '@/features/members/logic/repository';
import MemberDetailScreen from '@/screens/members/[memberId]';

import type { Member } from '@prisma/client';
import type { GetServerSideProps } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type Params = ParsedUrlQuery & {
  memberId: string;
};

type Props = {
  member: Member;
};

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { memberId } = params as Params;
  const result = await findMemberById(memberId);

  if (result.type === 'success') {
    if (!result.data) {
      return { notFound: true };
    }

    return {
      props: {
        member: result.data,
      },
    };
  } else {
    console.error(result.error);
    throw result.error;
  }
};

const Page = ({ member }: Props) => <MemberDetailScreen member={member} />;

export default Page;
