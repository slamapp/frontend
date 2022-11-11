import type { ReactNode } from "react"
import { useState } from "react"
import * as Sentry from "@sentry/nextjs"
import type { DehydratedState } from "@tanstack/react-query"
import {
  Hydrate,
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

type Props = {
  hydrateState?: DehydratedState
  children: ReactNode
}
const QueryClientProvider = ({ hydrateState, children }: Props) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 0,
          },
        },
        logger: {
          log: (message) => {
            Sentry.captureMessage(message)
          },
          warn: (message) => {
            Sentry.captureMessage(message)
          },
          error: (error) => {
            Sentry.captureException(error)
          },
        },
      })
  )

  return (
    <TanStackQueryClientProvider client={queryClient}>
      <Hydrate state={hydrateState}>{children}</Hydrate>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </TanStackQueryClientProvider>
  )
}

export default QueryClientProvider
