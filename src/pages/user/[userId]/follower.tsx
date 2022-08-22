import React from "react"
import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { UserListItem } from "~/components/domains"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"
import followAPI from "~/service/followApi"

const FollowerPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_FOLLOWER")
  const { query } = useRouter()

  const userFollowerQuery = useQuery(
    ["users", query.userId, "followers"],
    async () => {
      const { data } = await followAPI.getUserFollowers({
        userId: `${query.userId}`,
        isFirst: true,
        lastId: null,
      })

      return data
    },
    { enabled: !!query.userId }
  )

  if (userFollowerQuery.isLoading) {
    return <>...loadng</>
  }

  if (userFollowerQuery.isError) {
    return <>{JSON.stringify(userFollowerQuery.error)}</>
  }

  return (
    <div>
      {userFollowerQuery.data.contents.map(({ id, creator }) => (
        <UserListItem
          key={id}
          user={{
            id: creator.id,
            nickname: creator.nickname,
            profileImage: creator.profileImage,
          }}
          isFollowed
        />
      ))}
    </div>
  )
}

export default withRouteGuard("private", FollowerPage)
