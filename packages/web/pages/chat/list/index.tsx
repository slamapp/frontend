import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const Page = withRouteGuard("private", () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_CHATROOM_LIST")

  return <div>채팅방 리스트 페이지</div>
})

export default Page
