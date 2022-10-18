import type { ComponentProps, FC } from "react"
import { Suspense, useEffect, useState } from "react"
import type { NextPage } from "next"
import { Center, Spinner } from "@chakra-ui/react"

const withSuspense =
  <P extends object>(
    Fallback: FC<P> | "defaultFallback",
    Page: NextPage<P>
  ): NextPage<P> =>
  (props) => {
    return (
      <CustomSuspense
        fallback={
          Fallback === "defaultFallback" ? (
            <DefaultFallback />
          ) : (
            <Fallback {...props} />
          )
        }
      >
        <Page {...props} />
      </CustomSuspense>
    )
  }

const DefaultFallback = () => (
  <Center flex={1}>
    <Spinner />
  </Center>
)

const useMounted = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return mounted
}

const CustomSuspense = (props: ComponentProps<typeof Suspense>) => {
  const isMounted = useMounted()

  return isMounted ? <Suspense {...props} /> : <>{props.fallback}</>
}

export default withSuspense
