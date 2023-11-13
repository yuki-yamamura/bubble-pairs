import type { Level, Member, Sex } from '@prisma/client';

export const filterMembers = (
  members: Member[],
  selectedSexes: Sex[],
  selectedLevels: Level[],
) => {
  const filterMembersBySex = (members: Member[]) =>
    selectedSexes.length === 0
      ? members
      : members.filter((member) => selectedSexes.includes(member.sex));
  const filterMembersByLevel = (members: Member[]) =>
    selectedLevels.length === 0
      ? members
      : members.filter((member) => selectedLevels.includes(member.level));

  return filterMembersByLevel(filterMembersBySex(members));
};
