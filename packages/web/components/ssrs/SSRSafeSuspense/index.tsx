import type { ComponentProps } from "react"
import { Suspense } from "react"
import { useIsMounted } from "~/hooks"

const SSRSafeSuspense = (props: ComponentProps<typeof Suspense>) => {
  const isMounted = useIsMounted()

  return isMounted ? <Suspense {...props} /> : <>{props.fallback}</>
}

export default SSRSafeSuspense
