import { Fragment, forwardRef, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { Box, HStack } from '@chakra-ui/react'
import { css, useTheme } from '@emotion/react'
import { APINotification } from '@slam/types'
import { Delay, Suspense } from '@suspensive/react'
import { useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { motion } from 'framer-motion'
import { api } from '~/api'
import { NoItemMessage, ProfileAvatar } from '~/components/domains'
import { InfiniteScrollSensor, Skeleton } from '~/components/uis'
import { key } from '~/features'
import { useGetInfiniteNotificationsQuery } from '~/features/notifications'
import { useIsMounted } from '~/hooks'
import { Navigation } from '~/layouts/Layout/navigations'

const Page: NextPage = () => (
  <Navigation
    top={{
      title: '알림',
      isBack: true,
    }}
  >
    <Suspense.CSROnly
      fallback={
        <Delay>
          <SkeletonNotification />
        </Delay>
      }
    >
      <Contents />
    </Suspense.CSROnly>
  </Navigation>
)

export default Page

const Contents = () => {
  const queryClient = useQueryClient()
  const notifications = useGetInfiniteNotificationsQuery()
  const isMounted = useIsMounted()

  useEffect(() => {
    return () => {
      if (isMounted) {
        api.notifications.readAllNotifications().then(() => {
          queryClient.invalidateQueries(key.notifications.all)
        })
      }
    }
  }, [isMounted])

  return (
    <Box mx="16px" mt="24px">
      {notifications.data.pages.length === 0 && (
        <NoItemMessage
          type="notification"
          title="알림이 없습니다"
          description="유용한 정보를 알림에서 모아 보실 수 있어요"
          buttonTitle="지도에서 내 주변 농구장 찾기"
        />
      )}
      {notifications.data.pages.map(({ contents, lastId }, pageIndex) => (
        <Fragment key={pageIndex}>
          {contents.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
          {pageIndex !== notifications.data.pages.length - 1 ? null : lastId ? (
            <InfiniteScrollSensor
              onIntersected={() => {
                notifications.fetchNextPage()
              }}
              render={(ref) => <SkeletonNotification ref={ref} />}
            />
          ) : (
            <NoItemMessage
              type="notification"
              title="더 받아올 알림이 없습니다"
              description="유용한 정보를 알림에서 모아 보실 수 있어요"
              buttonTitle="지도에서 내 주변 농구장 찾기"
            />
          )}
        </Fragment>
      ))}
    </Box>
  )
}

const SkeletonNotification = forwardRef<HTMLDivElement>(function SkeletonNotification(_, ref) {
  return (
    <div ref={ref} style={{ padding: 12 }}>
      <div style={{ display: 'flex' }}>
        <div style={{ float: 'left', marginRight: 16 }}>
          <Skeleton.Circle size={60} />
        </div>
        <div style={{ float: 'left', width: '80%' }}>
          <Skeleton.Paragraph line={2} />
        </div>
        <div style={{ clear: 'both' }} />
      </div>
    </div>
  )
})

const NotificationItem = ({ notification }: { notification: APINotification }) => {
  const fromCreatedAt = dayjs(notification.createdAt).fromNow()
  const theme = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      css={css`
        gap: 12px;
        align-items: center;
        margin-bottom: 12px;
        padding: 12px;
        color: ${notification.type === 'FOLLOW' ? theme.colors.gray0900 : theme.colors.white};
        background: ${notification.type === 'FOLLOW'
          ? theme.colors.white
          : 'linear-gradient(to right, #262625, #35332F)'};
        border-radius: 10px;
        box-shadow: 0px 12px 12px -12px rgb(0 0 0 / 10%);
      `}
    >
      <HStack spacing="6px">{getNotificationMarkUp({ notification })}</HStack>
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            height: 24,
          }}
        >
          <div
            style={{
              fontSize: 10,
            }}
          >
            {notification.isRead ? '읽음' : '안 읽음'}
          </div>
          <div style={{ fontSize: 12 }}>{fromCreatedAt}</div>
        </div>
      </div>
    </motion.div>
  )
}

const getNotificationMarkUp = ({ notification }: { notification: APINotification }) => {
  switch (notification.type) {
    case 'FOLLOW': {
      const { sender } = notification.follow

      return (
        <>
          <ProfileAvatar user={{ id: sender.id, profileImage: sender.profileImage }} />
          <div>
            <Link href={`user/${sender.id}`} passHref>
              <strong>{sender.nickname}</strong>
            </Link>
            님이 팔로우 했습니다
          </div>
        </>
      )
    }

    default:
      break
  }
}
