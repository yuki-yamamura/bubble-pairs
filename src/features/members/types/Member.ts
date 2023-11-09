export type Member = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  kana: string | null;
  displayName: string | null;
  sex: string;
  level: string;
  avatar: string;
  note: string | null;
};
