import type { AppProps } from "next/app"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "@emotion/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import {
  AnalyticsProvider,
  AuthProvider,
  NavigationProvider,
  SocketProvider,
} from "~/contexts"
import { EssentialImagePreload, Layout } from "~/layouts"
import { GlobalCSS, chakraTheme, emotionTheme } from "~/styles"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Slam | 우리 주변 농구장을 빠르게</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={chakraTheme}>
          <ThemeProvider theme={emotionTheme}>
            <GlobalCSS />
            <AuthProvider>
              <SocketProvider>
                <NavigationProvider>
                  <AnalyticsProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </AnalyticsProvider>
                </NavigationProvider>
              </SocketProvider>
            </AuthProvider>
          </ThemeProvider>
        </ChakraProvider>
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </QueryClientProvider>
      <EssentialImagePreload lazyLoadTime={2000} />
    </>
  )
}

export default MyApp
