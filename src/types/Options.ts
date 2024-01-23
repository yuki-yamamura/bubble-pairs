export type Options<T extends string | number = string> = {
  label: string;
  value: T;
}[];
