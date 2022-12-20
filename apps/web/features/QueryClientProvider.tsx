import type { ReactNode } from "react"
import { useState } from "react"
import * as Sentry from "@sentry/nextjs"
import {
  QueryClient,
  QueryClientProvider as TanStackQueryClientProvider,
} from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

type Props = {
  children: ReactNode
}
const QueryClientProvider = ({ children }: Props) => {
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
      {children}
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </TanStackQueryClientProvider>
  )
}

export default QueryClientProvider
