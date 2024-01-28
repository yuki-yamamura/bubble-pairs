import { Emoji as BaseEmoji, EmojiStyle } from 'emoji-picker-react';

import type { ComponentPropsWithoutRef } from 'react';

type Props = Pick<
  ComponentPropsWithoutRef<typeof BaseEmoji>,
  'unified' | 'size'
>;

const Emoji = ({ unified, size }: Props) => (
  <BaseEmoji unified={unified} size={size} emojiStyle={EmojiStyle.TWITTER} />
);

export default Emoji;
