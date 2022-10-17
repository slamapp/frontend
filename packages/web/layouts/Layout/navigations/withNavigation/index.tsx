import { useEffect } from "react"
import type { NextPage } from "next"
import type { useNavigationValue } from "../atoms"
import { useSetNavigation } from "../atoms"

const withNavigation =
  <P extends object>(
    options: Pick<ReturnType<typeof useNavigationValue>, "top" | "bottom">,
    Page: NextPage<P>
  ): NextPage<P> =>
  (props) => {
    const set = useSetNavigation()
    useEffect(() => {
      set.all((prev) => ({
        ...prev,
        bottom: true,
        ...options,
        isLoading: false,
      }))
    }, [])

    return <Page {...props} />
  }

export default withNavigation
