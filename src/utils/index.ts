export const shuffleArray = <T>(array: T[]): T[] => {
  const copiedArray = [...array];
  for (let i = copiedArray.length - 1; 0 < i; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }

  return copiedArray;
};
