import React, { useRef, useEffect, useMemo } from "react"
import type { NextPage } from "next"
import styled from "@emotion/styled"
import { NoItemMessage } from "~/components/domains"
import NotificationList from "~/components/domains/NotificationList"
import { Skeleton } from "~/components/uis/atoms"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"
import { useIntersectionObserver } from "~/hooks"

const NotificationsPage: NextPage = () => {
  const { authProps, getMoreNotifications, readAllNotifications } =
    useAuthContext()
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_NOTIFICATIONS")

  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, {})

  useEffect(() => {
    if (entry?.isIntersecting) {
      getMoreNotifications()
    }
  }, [entry?.isIntersecting])

  const isNeedReadAllNotifications = useMemo(
    () => authProps.notifications.some((notification) => !notification.isRead),
    [authProps.notifications]
  )

  useEffect(() => {
    if (isNeedReadAllNotifications) {
      readAllNotifications()
    }
  }, [])

  if (!authProps.currentUser) {
    return null
  }

  return (
    <PageConainer>
      <NotificationList />
      <div ref={ref} style={{ minHeight: 200 }}>
        {authProps.notificationLastId ? (
          <div>
            <SkeletonNotification />
            <SkeletonNotification />
          </div>
        ) : (
          authProps.notifications.length === 0 || (
            <NoItemMessage
              type="notification"
              title="더 받아올 알림이 없습니다"
              description="유용한 정보를 알림에서 모아 보실 수 있어요"
              buttonTitle="지도에서 내 주변 농구장 찾기"
              style={{ marginLeft: 16, marginRight: 16 }}
            />
          )
        )}
      </div>
    </PageConainer>
  )
}

export default withRouteGuard("private", NotificationsPage)

const PageConainer = styled.div`
  flex: 1;
`

const SkeletonNotification = () => (
  <div style={{ padding: 12 }}>
    <div style={{ display: "flex" }}>
      <div style={{ float: "left", marginRight: 16 }}>
        <Skeleton.Circle size={60} />
      </div>
      <div style={{ float: "left", width: "80%" }}>
        <Skeleton.Paragraph line={2} />
      </div>
      <div style={{ clear: "both" }} />
    </div>
  </div>
)
