import LinkPrimitive from 'next/link';

import type { LucideIcon } from 'lucide-react';

type Props = {
  text: string;
  Icon?: LucideIcon;
};
const Link = ({ text, Icon }: Props) => (
  <LinkPrimitive
    href="/"
    className="text-primary-blue flex items-center gap-x-2  underline-offset-4  hover:underline"
  >
    {Icon && <Icon size={16} />}
    {text}
  </LinkPrimitive>
);

export default Link;
