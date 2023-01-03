import type { AppProps } from "next/app"
import Head from "next/head"
import { ChakraProvider } from "@chakra-ui/react"
import { ThemeProvider } from "@emotion/react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"
import { RecoilRoot } from "recoil"
import { OpenGraph } from "~/components/common"
import { env } from "~/constants"
import { AnalyticsProvider } from "~/contexts"
import { QueryClientProvider } from "~/features"
import { useSentry } from "~/hooks/domain"
import { Layout } from "~/layouts"
import { GlobalCSS, chakraTheme, emotionTheme } from "~/styles"

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.tz.setDefault("Asia/Seoul")

const App = ({ Component, pageProps }: AppProps) => {
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
        <QueryClientProvider>
          <ChakraProvider resetCSS theme={chakraTheme}>
            <ThemeProvider theme={emotionTheme}>
              <GlobalCSS />
              <AnalyticsProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </AnalyticsProvider>
            </ThemeProvider>
          </ChakraProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </>
  )
}

export default App
