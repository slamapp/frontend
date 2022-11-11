import type { ComponentProps } from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "@emotion/react"
import { CookiesProvider } from "react-cookie"
import { RecoilRoot } from "recoil"
import { OpenGraph } from "~/components/common"
import { env } from "~/constants"
import AnalyticsProvider from "~/contexts/AnalyticsProvider"
import SocketProvider from "~/contexts/SocketProvider"
import { QueryClientProvider } from "~/features"
import { useSentry } from "~/hooks/domain"
import { Layout } from "~/layouts"
import { GlobalCSS, chakraTheme, emotionTheme } from "~/styles"

type PageProps = {
  hydrateState: ComponentProps<typeof QueryClientProvider>["hydrateState"]
}

const App = ({ Component, pageProps }: AppProps<PageProps>) => {
  useSentry({
    dsn: env.SENTRY_DSN,
    allowUrls: ["https://slams.app", "https://dev.slams.app"],
  })

  return (
    <>
      <Head>
        <title>함께 농구할 사람을 가장 쉽게 찾아보세요</title>
      </Head>
      <OpenGraph
        title="함께 농구할 사람을 가장 쉽게 찾아보세요"
        description="슬램 | 농구할 사람이 없다고?"
      />
      <RecoilRoot>
        <CookiesProvider>
          <QueryClientProvider hydrateState={pageProps.hydrateState}>
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
          </QueryClientProvider>
        </CookiesProvider>
      </RecoilRoot>
    </>
  )
}

export default App
