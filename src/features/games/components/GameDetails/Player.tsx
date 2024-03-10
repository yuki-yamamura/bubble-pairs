import DecoratedMember from '@/features/members/components/DecoratedMember';

import type { Player as PlayerType } from '@/types/models/Player';

type Props = {
  player: PlayerType;
};

const Player = ({ player }: Props) => (
  <DecoratedMember member={player.participant.member} />
);

export default Player;
