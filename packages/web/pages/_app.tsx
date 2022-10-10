import type { AppProps } from "next/app"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "@emotion/react"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { CookiesProvider } from "react-cookie"
import {
  AnalyticsProvider,
  NavigationProvider,
  QueryClientProvider,
  SocketProvider,
} from "~/contexts"
import { EssentialImagePreload, Layout } from "~/layouts"
import { GlobalCSS, chakraTheme, emotionTheme } from "~/styles"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Slam | 우리 주변 농구장을 빠르게</title>
      </Head>
      <CookiesProvider>
        <QueryClientProvider>
          <ChakraProvider resetCSS theme={chakraTheme}>
            <ThemeProvider theme={emotionTheme}>
              <GlobalCSS />
              <SocketProvider>
                <NavigationProvider>
                  <AnalyticsProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </AnalyticsProvider>
                </NavigationProvider>
              </SocketProvider>
            </ThemeProvider>
          </ChakraProvider>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </QueryClientProvider>
      </CookiesProvider>
      <EssentialImagePreload lazyLoadTime={10} />
    </>
  )
}

export default MyApp
