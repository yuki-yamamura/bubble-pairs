import LinkPrimitive from 'next/link';

import type { LucideIcon } from 'lucide-react';
import type { LinkProps } from 'next/link';

type Props = LinkProps & {
  text: string;
  Icon?: LucideIcon;
};
const Link = ({ text, Icon, ...rest }: Props) => (
  <LinkPrimitive
    {...rest}
    className="flex items-center gap-x-2 text-primary-blue  underline-offset-4  hover:underline"
  >
    {Icon && <Icon size={16} />}
    {text}
  </LinkPrimitive>
);

export default Link;
