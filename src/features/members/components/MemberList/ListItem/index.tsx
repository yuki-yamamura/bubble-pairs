import Emoji from '@/components/Emoji';
import { Avatar } from '@/components/ui/avatar';
import { levelMap, sexMap } from '@/constants';
import Link from 'next/link';

import type { Member } from '@prisma/client';

type Props = {
  member: Member;
};

const ListItem = ({
  member: { displayName, emojiUnicode, id, level, name, sex },
}: Props) => {
  const href = `/members/${id}`;

  return (
    <Link href={href} className="my-2 flex gap-x-4">
      <Avatar className="items-center justify-center bg-card">
        <Emoji unified={emojiUnicode} size={24} />
      </Avatar>
      <div className="flex flex-col gap-y-1">
        <span className="text-sm">{displayName ?? name}</span>
        <span className="text-xs text-slate-400">
          {levelMap.get(level)} / {sexMap.get(sex)}
        </span>
      </div>
    </Link>
  );
};

export default ListItem;
