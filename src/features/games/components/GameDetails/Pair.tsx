import DecoratedMember from '@/features/members/components/DecoratedMember';

import type { Player } from '@/types/models/Player';

type Props = {
  players: [Player, Player];
};

const Pair = ({ players }: Props) => (
  <div className={'flex max-w-fit flex-col gap-y-2'}>
    <DecoratedMember member={players[0].participant.member} />
    <DecoratedMember member={players[1].participant.member} />
  </div>
);

export default Pair;
