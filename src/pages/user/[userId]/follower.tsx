import React from "react"
import type { NextPage } from "next"
import { useNavigationContext } from "~/contexts/hooks"
import { withRouteGuard } from "~/hocs"

const FollowerPage: NextPage = () => {
  const { useMountPage } = useNavigationContext()
  useMountPage("PAGE_USER_FOLLOWER")

  return <div>Follower Page</div>
}

export default withRouteGuard("private", FollowerPage)
