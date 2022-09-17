import Link from "next/link"
import { IconButton } from "~/components/uis/molecules"
import type { APIChatRoom } from "~/types/domains"

interface Props {
  chatroomId: APIChatRoom["id"]
}

const ChatButton: React.FC<Props> = ({ chatroomId }) => {
  return (
    <Link href={`/chat/${chatroomId}`} passHref>
      <a>
        <IconButton name="message-circle" />
      </a>
    </Link>
  )
}

export default ChatButton
