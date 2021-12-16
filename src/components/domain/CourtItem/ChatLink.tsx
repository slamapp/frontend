import Link from "next/link";

import { IconButton } from "@components/base";

interface Props {
  courtId: number;
}

const ChatButton: React.FC<Props> = ({ courtId }) => {
  return (
    <Link href={`/chat/courts/${courtId}`} passHref>
      <IconButton name="message-square" />
    </Link>
  );
};

export default ChatButton;
