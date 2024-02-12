import { Emoji as EmojiPrimitive, EmojiStyle } from 'emoji-picker-react';

import type { ComponentPropsWithoutRef } from 'react';

type Props = Pick<
  ComponentPropsWithoutRef<typeof EmojiPrimitive>,
  'unified' | 'size'
>;

const Emoji = ({ unified, size }: Props) => (
  <EmojiPrimitive
    unified={unified}
    size={size}
    emojiStyle={EmojiStyle.TWITTER}
  />
);

export default Emoji;
