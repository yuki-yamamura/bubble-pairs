import Emoji from '@/components/Emoji';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const DecoratedMember = ({ member: { id, emojiUnicode, name } }: Props) => (
  <div className="flex items-center gap-x-4">
    <div className="max-w-fit shrink-0 rounded-full bg-slate-50 p-2 text-sm">
      <Emoji unified={emojiUnicode} size={14} />
    </div>
    <div id={id} className="line-clamp-1">
      {name}
    </div>
  </div>
);

export default DecoratedMember;
