import type { AppProps } from "next/app"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "@emotion/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { CookiesProvider } from "react-cookie"
import { RecoilRoot } from "recoil"
import AnalyticsProvider from "~/contexts/AnalyticsProvider"
import SocketProvider from "~/contexts/SocketProvider"
import { Layout } from "~/layouts"
import { GlobalCSS, chakraTheme, emotionTheme } from "~/styles"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

function MyApp({ Component, pageProps }: AppProps) {
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
