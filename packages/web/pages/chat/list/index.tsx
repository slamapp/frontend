import type { NextPage } from "next"
import { useNavigationContext } from "~/contexts/hooks"

const Page: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_CHATROOM_LIST")

  return <div>채팅방 리스트 페이지</div>
}

export default Page
