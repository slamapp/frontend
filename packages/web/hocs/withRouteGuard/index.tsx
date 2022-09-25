import type { NextPage } from "next"
import { useRouter } from "next/router"
import { useAuthContext } from "~/contexts/hooks"
import { useLocalToken } from "~/hooks/domain"

// TODO: Version2에서 private / prevented RedirectPath Props로 받아오도록 변경하기
const privateRedirectPath = "/map"
const preventedRedirectPath = "/"

type RouteOption = "private" | "prevented"

const withRouteGuard = <P extends object>(
  option: RouteOption,
  Page: NextPage<P>
) => {
  return (props: P) => {
    const { authProps } = useAuthContext()
    const [localToken] = useLocalToken()
    const router = useRouter()

    if (!router.isReady || authProps.isLoading) {
      return <>Loading...</>
    }

    if (option === "prevented") {
      if (localToken || authProps.currentUser) {
        router.replace(preventedRedirectPath)
      } else {
        return <Page {...props} />
      }
    }

    if (option === "private") {
      if (localToken && authProps.currentUser) {
        return <Page {...props} />
      } else {
        router.replace(privateRedirectPath)
      }
    }

    return null
  }
}

export default withRouteGuard
