import { useEffect, useMemo, useRef } from "react"
import { Box, HStack } from "@chakra-ui/react"
import { css, useTheme } from "@emotion/react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { motion } from "framer-motion"
import { CourtItem, NoItemMessage, ProfileAvatar } from "~/components/domains"
import { LinkStrong, Skeleton } from "~/components/uis"
import { useAuthContext, useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"
import { useIntersectionObserver } from "~/hooks"
import type { APINotification } from "~/types/domains/objects"

dayjs.extend(relativeTime)

const Page = withRouteGuard("private", () => {
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
    <div
      css={css`
        flex: 1;
      `}
    >
      <Box mx="16px">
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
      </Box>
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
            />
          )
        )}
      </div>
    </div>
  )
})

export default Page

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

const NotificationItem = ({
  notification,
}: {
  notification: APINotification
}) => {
  const { createdAt, isClicked, isRead } = notification
  const date = new Date(createdAt)
  const fromCreatedAt = dayjs(date).locale("ko").fromNow()
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      css={css`
        align-items: center;
        gap: 12px;
        padding: 12px;
        margin-bottom: 12px;
        background: ${notification.type === "FOLLOW"
          ? theme.colors.white
          : "linear-gradient(to right, #262625, #35332F)"};
        color: ${notification.type === "FOLLOW"
          ? theme.colors.gray0900
          : theme.colors.white};
        border-radius: 10px;
        box-shadow: 0px 12px 12px -12px rgb(0 0 0 / 10%);
      `}
    >
      <HStack spacing="6px">
        {getNotificationMarkUp({ date, notification })}
      </HStack>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            height: 24,
          }}
        >
          <div
            style={{
              fontSize: 10,
            }}
          >
            {isRead ? "읽음" : "안 읽음"}
            {isClicked ? "확인 함" : "확인 안함"}
          </div>
          <div style={{ fontSize: 12 }}>{fromCreatedAt}</div>
        </div>
      </div>
    </motion.div>
  )
}

const getNotificationMarkUp = ({
  date,
  notification,
}: {
  date: Date
  notification: APINotification
}) => {
  const dayFormatted = dayjs(date).format("YYYY-MM-DD")

  switch (notification.type) {
    case "FOLLOW": {
      const { sender } = notification.follow

      return (
        <>
          <ProfileAvatar
            user={{ id: sender.id, profileImage: sender.profileImage }}
          />
          <div>
            <LinkStrong href={`user/${sender.id}`}>
              {sender.nickname}
            </LinkStrong>
            님이 팔로우 했습니다
          </div>
        </>
      )
    }
    case "LOUDSPEAKER": {
      const { court } = notification.loudspeaker

      return (
        <>
          <CourtItem.KakaoMapLink
            latitude={court.latitude}
            longitude={court.longitude}
            courtName={court.name}
            type="findRoad"
          />
          <div>
            <div>
              <LinkStrong href={`courts/${court.id}/${dayFormatted}`}>
                {`${court.name} (농구 골대 ${court.basketCount} 개)`}
              </LinkStrong>
              에서 함께 농구할 사람을 급하게 구하고 있습니다
            </div>
            <div>{court.image}</div>
          </div>
        </>
      )
    }

    default:
      break
  }
}
