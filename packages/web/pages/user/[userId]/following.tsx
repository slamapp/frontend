import { Fragment } from "react"
import type { GetServerSideProps, NextPage } from "next"
import { Box, HStack, VStack } from "@chakra-ui/react"
import { Suspense } from "@suspensive/react"
import { FollowListItem, NoItemMessage } from "~/components/domains"
import { InfiniteScrollSensor, Skeleton } from "~/components/uis"
import { useUserFollowingInfiniteQuery } from "~/features/users"
import { Navigation } from "~/layouts/Layout/navigations"
import type { APIUser } from "~/types/domains/objects"

type Props = { userId: APIUser["id"] }
const Page: NextPage<Props> = ({ userId }) => (
  <Navigation
    top={{
      title: "팔로잉",
      isBack: true,
    }}
  >
    <Suspense.CSROnly>
      <Contents userId={userId} />
    </Suspense.CSROnly>
  </Navigation>
)

const Contents = ({ userId }: Props) => {
  const userFollowingInfiniteQuery = useUserFollowingInfiniteQuery(userId)

  return (
    <VStack spacing="16px" mt="16px">
      {userFollowingInfiniteQuery.data.pages.map(
        ({ contents, lastId }, pageIndex) => (
          <Fragment key={pageIndex}>
            {contents.map(({ id, receiver }) => (
              <FollowListItem key={id} user={receiver} isFollowed />
            ))}
            {pageIndex !==
            userFollowingInfiniteQuery.data.pages.length - 1 ? null : lastId ? (
              <InfiniteScrollSensor
                onIntersected={() => userFollowingInfiniteQuery.fetchNextPage()}
                render={(ref) => (
                  <HStack ref={ref} width="100%" px="16px" my="16px">
                    <Skeleton.Circle size={32} />
                    <Box flex={1}>
                      <Skeleton.Box width={80} height={20} />
                    </Box>
                    <Skeleton.Box width={70} height={30} />
                  </HStack>
                )}
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
}

export default Page

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query,
}) => ({ props: { userId: query.userId as string } })
