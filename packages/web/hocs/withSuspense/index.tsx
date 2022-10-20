import type { FC, ReactNode } from "react"
import type { NextPage } from "next"
import { Center, Spinner } from "@chakra-ui/react"
import { SSRSafeSuspense } from "~/components/ssrs"

type WithSuspense = <P extends object>(
  Component: FC<P>,
  Fallback?: FC<P> | ReactNode
) => NextPage<P>

const withSuspense: WithSuspense =
  (
    Component,
    Fallback = (
      <Center flex={1}>
        <Spinner />
      </Center>
    )
  ) =>
  (props) =>
    (
      <SSRSafeSuspense
        fallback={
          typeof Fallback === "function" ? <Fallback {...props} /> : Fallback
        }
      >
        <Component {...props} />
      </SSRSafeSuspense>
    )

export default withSuspense
