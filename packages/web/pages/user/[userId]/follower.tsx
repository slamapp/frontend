import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useInfiniteQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { UserListItem } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const FollowerPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_FOLLOWER")
  const { query } = useRouter()

  const userFollowerQuery = useInfiniteQuery(
    ["users", query.userId, "followers"],
    async ({ queryKey }) => {
      const { data } = await api.follows.getUserFollowers({
        id: `${queryKey[1] as string}`,
        isFirst: true,
        lastId: null,
      })

      return data
    },
    {
      enabled: !!query.userId,
      getNextPageParam: ({ lastId }) => lastId,
    }
  )

  if (userFollowerQuery.isLoading) {
    return <>...loadng</>
  }

  if (userFollowerQuery.isError) {
    return <>{JSON.stringify(userFollowerQuery.error)}</>
  }

  return (
    <div>
      {userFollowerQuery.data.pages.map(({ contents, lastId }, index) =>
        contents.map(({ id, creator }, index) => (
          <>
            <UserListItem
              key={id}
              user={{
                id: creator.id,
                nickname: creator.nickname,
                profileImage: creator.profileImage,
              }}
              isFollowed
            />
            {index === userFollowerQuery.data.pages.length - 1 &&
              (lastId ? (
                <InfiniteScrollSensor />
              ) : (
                "더 받아올 내용이 없습니다."
              ))}
          </>
        ))
      )}
    </div>
  )
}

export default withRouteGuard("private", FollowerPage)

const InfiniteScrollSensor = () => {
  return <>bottom</>
}
