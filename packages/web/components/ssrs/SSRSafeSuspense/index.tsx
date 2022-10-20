import type { ComponentProps } from "react"
import { Suspense } from "react"
import { useMounted } from "~/hooks"

const SSRSafeSuspense = (props: ComponentProps<typeof Suspense>) => {
  const isMounted = useMounted()

  return isMounted ? <Suspense {...props} /> : <>{props.fallback}</>
}

export default SSRSafeSuspense
