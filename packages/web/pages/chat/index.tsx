import type { NextPage } from "next"
import { useNavigationContext } from "~/contexts/hooks"

const Page: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_CHATROOM_LIST")

  return <div>Chatroom List Page</div>
}

export default Page
