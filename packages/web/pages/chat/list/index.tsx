import { withNavigation } from "~/layouts/Layout/navigations"

const Page = withNavigation(
  {
    top: {
      title: "채팅",
      isNotification: true,
      isProfile: true,
    },
  },
  () => {
    return <div>채팅방 리스트 페이지</div>
  }
)

export default Page
