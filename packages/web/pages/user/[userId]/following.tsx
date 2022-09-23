import type { NextPage } from "next"
import { useRouter } from "next/router"
import { UserListItem } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"
import { useUserFollowingQuery } from "~/features/users"
import { withRouteGuard } from "~/hocs"

const FollowingPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_FOLLOWING")
  const { query } = useRouter()

  const userFollowingQuery = useUserFollowingQuery(query.userId as string)

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
