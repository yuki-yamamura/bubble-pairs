import Emoji from '@/components/Emoji';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const DecoratedMember = ({ member: { emojiUnicode, name } }: Props) => (
  <div className="line-clamp-1 flex items-center gap-x-4">
    <div className="max-w-fit rounded-full bg-slate-50 p-2 text-sm">
      <Emoji unified={emojiUnicode} size={14} />
    </div>
    <div>{name}</div>
  </div>
);

export default DecoratedMember;
