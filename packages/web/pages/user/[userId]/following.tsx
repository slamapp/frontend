import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { api } from "~/api"
import { UserListItem } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const FollowingPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_FOLLOWING")
  const { query } = useRouter()

  const userFollowingQuery = useQuery(
    ["users", query.userId, "followings"],
    async () => {
      const { data } = await api.follow.getUserFollowings({
        id: `${query.userId as string}`,
        isFirst: true,
        lastId: null,
      })

      return data
    },
    { enabled: !!query.userId }
  )

  if (userFollowingQuery.isLoading) {
    return <>...loadng</>
  }

  if (userFollowingQuery.isError) {
    return <>{JSON.stringify(userFollowingQuery.error)}</>
  }

  return (
    <div>
      {userFollowingQuery.data.contents.map(({ id, receiver }) => (
        <UserListItem
          key={id}
          user={{
            id: receiver.id,
            nickname: receiver.nickname,
            profileImage: receiver.profileImage,
          }}
          isFollowed
        />
      ))}
    </div>
  )
}

export default withRouteGuard("private", FollowingPage)
