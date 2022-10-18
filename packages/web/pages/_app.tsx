import { Suspense } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "@emotion/react"
import * as Sentry from "@sentry/nextjs"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { CookiesProvider } from "react-cookie"
import { RecoilRoot } from "recoil"
import { env } from "~/constants"
import AnalyticsProvider from "~/contexts/AnalyticsProvider"
import SocketProvider from "~/contexts/SocketProvider"
import { useSentry } from "~/hooks/domain"
import { Layout } from "~/layouts"
import { GlobalCSS, chakraTheme, emotionTheme } from "~/styles"

const queryClient = new QueryClient({
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

function MyApp({ Component, pageProps }: AppProps) {
  useSentry({
    dsn: env.SENTRY_DSN,
    allowUrls: ["https://slams.app", "https://dev.slams.app"],
  })

  return (
    <>
      <Head>
        <title>Slam | 우리 주변 농구장을 빠르게</title>
      </Head>
      <RecoilRoot>
        <CookiesProvider>
          <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={chakraTheme}>
              <ThemeProvider theme={emotionTheme}>
                <GlobalCSS />
                <SocketProvider>
                  <AnalyticsProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </AnalyticsProvider>
                </SocketProvider>
              </ThemeProvider>
            </ChakraProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          </QueryClientProvider>
        </CookiesProvider>
      </RecoilRoot>
    </>
  )
}

export default MyApp
