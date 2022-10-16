import { useEffect } from "react"
import type { NextPage } from "next"
import { useSetNavigation } from "../atoms"

const withNavigation =
  <P extends object>(
    setterOrUpdater: Parameters<ReturnType<typeof useSetNavigation>["all"]>[0],
    Page: NextPage<P>
  ): NextPage<P> =>
  (props) => {
    const set = useSetNavigation()
    useEffect(() => {
      set.all(setterOrUpdater)
    }, [])

    return <Page {...props} />
  }

export default withNavigation
