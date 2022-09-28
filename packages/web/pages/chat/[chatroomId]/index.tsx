import { withRouteGuard } from "~/hocs"

const Page = withRouteGuard("private", () => {
  return <div>Chatroom Page</div>
})

export default Page
