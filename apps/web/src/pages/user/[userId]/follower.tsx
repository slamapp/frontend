import { Fragment, forwardRef } from 'react'
import { GetServerSideProps, NextPage } from 'next'
import { Box, HStack, VStack } from '@chakra-ui/react'
import { APIUser } from '@slam/types'
import { Delay, Suspense } from '@suspensive/react'
import { FollowListItem, NoItemMessage } from '~/components/domains'
import { InfiniteScrollSensor, Skeleton } from '~/components/uis'
import { useUserFollowerInfiniteQuery } from '~/features/users'
import { Navigation } from '~/layouts/Layout/navigations'

type Props = { userId: APIUser['id'] }
const Page: NextPage<Props> = ({ userId }) => (
  <Navigation
    top={{
      title: '팔로워',
      isBack: true,
    }}
  >
    <Suspense.CSROnly
      fallback={
        <Delay>
          <NotificationItemSkeleton />
        </Delay>
      }
    >
      <Contents userId={userId} />
    </Suspense.CSROnly>
  </Navigation>
)

const Contents = ({ userId }: Props) => {
  const userFollowerInfiniteQuery = useUserFollowerInfiniteQuery(userId)

  return (
    <VStack spacing="16px" mt="16px">
      {userFollowerInfiniteQuery.isSuccess &&
        userFollowerInfiniteQuery.data.pages.map(({ contents, lastId }, pageIndex) => (
          <Fragment key={pageIndex}>
            {contents.map(({ id, creator }) => (
              <FollowListItem key={id} user={creator} isFollowed />
            ))}
            {pageIndex !== userFollowerInfiniteQuery.data.pages.length - 1 ? null : lastId ? (
              <InfiniteScrollSensor
                onIntersected={() => userFollowerInfiniteQuery.fetchNextPage()}
                render={(ref) => <NotificationItemSkeleton ref={ref} />}
              />
            ) : (
              <NoItemMessage
                type="follow"
                title="더 받아올 팔로워가 없네요"
                buttonTitle="지도로 가서 농구장 찾기"
                description="활발한 활동은 나를 팔로우해줄 친구들이 생기게 해요"
              />
            )}
          </Fragment>
        ))}
    </VStack>
  )
}

export default Page

export const getServerSideProps: GetServerSideProps<Props> = async ({ query }) => ({
  props: { userId: query.userId as string },
})

const NotificationItemSkeleton = forwardRef<HTMLDivElement>(function NotificationItemSkeleton(_, ref) {
  return (
    <HStack ref={ref} width="100%" px="16px" my="16px">
      <Skeleton.Circle size={32} />
      <Box flex={1}>
        <Skeleton.Box width={80} height={20} />
      </Box>
      <Skeleton.Box width={70} height={30} />
    </HStack>
  )
})
