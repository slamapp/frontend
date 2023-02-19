import { Navigation } from '~/layouts/Layout/navigations'

const Page = () => {
  return (
    <Navigation
      top={{
        title: '채팅',
        isNotification: true,
        isProfile: true,
      }}
      bottom
    >
      채팅방 리스트 페이지
    </Navigation>
  )
}

export default Page
