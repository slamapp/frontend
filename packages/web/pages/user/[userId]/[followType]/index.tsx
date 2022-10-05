import type { ComponentPropsWithoutRef } from "react"
import { Fragment, useEffect, useRef } from "react"
import type { GetServerSideProps } from "next"
import { Box, HStack, Text, VStack } from "@chakra-ui/react"
import { NoItemMessage, ProfileAvatar } from "~/components/domains"
import { Button, Skeleton } from "~/components/uis/atoms"
import { useNavigationContext } from "~/contexts/hooks"
import {
  useUserFollowerInfiniteQuery,
  useUserFollowingInfiniteQuery,
} from "~/features/users"
import { withRouteGuard } from "~/hocs"
import { useIntersectionObserver } from "~/hooks"
import type { APIUser } from "~/types/domains/objects"

type FollowType = "following" | "follower"

const Page = withRouteGuard<{
  userId: APIUser["id"]
  followType: FollowType
}>("private", ({ userId, followType }) => {
  const { useMountPage } = useNavigationContext()
  useMountPage(
    followType === "follower" ? "PAGE_USER_FOLLOWER" : "PAGE_USER_FOLLOWING"
  )

  const userFollowerInfiniteQuery = useUserFollowerInfiniteQuery(userId, {
    enabled: followType === "follower",
  })
  const userFollowingInfiniteQuery = useUserFollowingInfiniteQuery(userId, {
    enabled: followType === "following",
  })

  return (
    <VStack spacing="16px" mt="16px">
      {userFollowerInfiniteQuery.isSuccess &&
        userFollowerInfiniteQuery.data.pages.map(
          ({ contents, lastId }, pageIndex) => (
            <Fragment key={pageIndex}>
              {contents.map(({ id, creator }) => (
                <FollowListItem key={id} user={creator} isFollowed />
              ))}
              {pageIndex !==
              userFollowerInfiniteQuery.data.pages.length -
                1 ? null : lastId ? (
                <InfiniteScrollSensor
                  onIntersected={userFollowerInfiniteQuery.fetchNextPage}
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
          )
        )}
      {userFollowingInfiniteQuery.isSuccess &&
        userFollowingInfiniteQuery.data.pages.map(
          ({ contents, lastId }, pageIndex) => (
            <Fragment key={pageIndex}>
              {contents.map(({ id, receiver }) => (
                <FollowListItem key={id} user={receiver} isFollowed />
              ))}
              {pageIndex !==
              userFollowingInfiniteQuery.data.pages.length -
                1 ? null : lastId ? (
                <InfiniteScrollSensor
                  onIntersected={userFollowingInfiniteQuery.fetchNextPage}
                />
              ) : (
                <NoItemMessage
                  type="follow"
                  title="더 받아올 팔로잉이 없네요"
                  buttonTitle="지도로 가서 농구장 찾기"
                  description="활발한 활동은 내가 팔로우할 친구들이 생기게 해요"
                />
              )}
            </Fragment>
          )
        )}
    </VStack>
  )
})

export default Page

export const getServerSideProps: GetServerSideProps<
  ComponentPropsWithoutRef<typeof Page>
> = async ({ query }) => ({
  props: {
    userId: query.userId as string,
    followType: query.followType as FollowType,
  },
})

const FollowListItem = ({
  user,
  isFollowed,
}: {
  isFollowed: boolean
  user: Pick<APIUser, "profileImage" | "nickname" | "id">
}) => (
  <HStack width="100%" px="4">
    <ProfileAvatar
      profileImage={user.profileImage}
      userId={user.id}
      nickname={user.nickname}
    />
    <Text flex={1}>{user.nickname}</Text>
    <div>
      {isFollowed === undefined ? (
        <></>
      ) : isFollowed ? (
        <Button secondary>팔로잉</Button>
      ) : (
        <Button>팔로우</Button>
      )}
    </div>
  </HStack>
)

const InfiniteScrollSensor = ({
  onIntersected,
}: {
  onIntersected: () => void
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const entry = useIntersectionObserver(ref, { threshold: 0.5 })

  useEffect(() => {
    if (entry?.isIntersecting) {
      onIntersected()
    }
  }, [entry?.isIntersecting])

  return (
    <HStack ref={ref} width="100%" px="16px" my="16px">
      <Skeleton.Circle size={32} />
      <Box flex={1}>
        <Skeleton.Box width={80} height={20} />
      </Box>
      <Skeleton.Box width={70} height={30} />
    </HStack>
  )
}
