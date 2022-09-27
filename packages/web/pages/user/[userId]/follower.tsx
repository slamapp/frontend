import type { NextPage } from "next"
import { UserListItem } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"
import { useUserFollowerInfiniteQuery } from "~/features/users"
import { withRouteGuard } from "~/hocs"

const FollowerPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_FOLLOWER")

  const userFollowerInfiniteQuery = useUserFollowerInfiniteQuery()

  if (userFollowerInfiniteQuery.isLoading) {
    return <>...loadng</>
  }

  if (userFollowerInfiniteQuery.isError) {
    return <>{JSON.stringify(userFollowerInfiniteQuery.error)}</>
  }

  return (
    <div>
      {userFollowerInfiniteQuery.data.pages.map(({ contents, lastId }, index) =>
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
            {index === userFollowerInfiniteQuery.data.pages.length - 1 &&
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
