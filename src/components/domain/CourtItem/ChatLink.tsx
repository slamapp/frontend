import Link from "next/link";
import { IconButton } from "@components/base";
import type { APIChatroom } from "@domainTypes/tobe";

interface Props {
  chatroomId: APIChatroom["id"];
}

const ChatButton: React.FC<Props> = ({ chatroomId }) => {
  return (
    <Link href={`/chat/${chatroomId}`} passHref>
      <a>
        <IconButton name="message-circle" />
      </a>
    </Link>
  );
};

export default ChatButton;
