import DecoratedMember from '@/features/members/components/DecoratedMember';
import { cn } from '@/lib/shadcn-ui';

import type { Player } from '@/types/models/Player';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  players: [Player, Player];
};

const Pair = ({ players, className, ...rest }: Props) => (
  <div className={(cn('flex max-w-fit flex-col gap-y-2'), className)} {...rest}>
    <DecoratedMember member={players[0].participant.member} />
    <DecoratedMember member={players[1].participant.member} />
  </div>
);

export default Pair;
