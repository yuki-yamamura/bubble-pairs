import { findMemberById } from '@/features/members/logic/repository';
import MemberDetailScreen from '@/screens/MemberDetailScreen';
import { notFound } from 'next/navigation';

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
      notFound();
    }

    return {
      props: {
        member: result.data,
      },
      notFound: false,
    };
  } else {
    throw result.error;
  }
};

const Page = ({ member }: Props) => <MemberDetailScreen member={member} />;

export default Page;
