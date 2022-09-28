import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const Page = withRouteGuard("private", () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_CHATROOM_LIST")

  return <div>Chatroom List Page</div>
})

export default Page
