import React from "react"
import styled from "@emotion/styled"
import { useAuthContext } from "~/contexts/hooks"
import { NoItemMessage } from ".."
import NotificationItem from "./NotificationItem"

const NotificationList = () => {
  const { authProps } = useAuthContext()

  return (
    <NotificationListContainer>
      {authProps.notifications.length === 0 && (
        <NoItemMessage
          type="notification"
          title="알림이 없습니다"
          description="유용한 정보를 알림에서 모아 보실 수 있어요"
          buttonTitle="지도에서 내 주변 농구장 찾기"
        />
      )}
      {authProps.notifications.map((notification) => (
        <NotificationItem
          key={notification.createdAt}
          notification={notification}
        />
      ))}
    </NotificationListContainer>
  )
}

export default NotificationList

const NotificationListContainer = styled.div`
  margin: 0 16px;
`
