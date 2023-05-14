import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ChakraProvider } from '@chakra-ui/react'
import { ThemeProvider, css } from '@emotion/react'
import { MediaQueryProvider } from '@jsxcss/emotion'
import { Delay, SuspensiveConfigs, SuspensiveProvider } from '@suspensive/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { RecoilRoot } from 'recoil'
import { OpenGraph, Spinner } from '~/components/common'
import { FullHeight } from '~/components/uis'
import { env } from '~/constants'
import { AnalyticsProvider } from '~/contexts'
import { QueryClientProvider } from '~/features'
import { useSentry } from '~/hooks'
import { Layout } from '~/layouts'
import { GlobalCSS, chakraTheme, emotionTheme } from '~/styles'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)
dayjs.tz.setDefault('Asia/Seoul')

const suspensiveConfigs = new SuspensiveConfigs({
  defaultOptions: {
    delay: { ms: 200 },
    suspense: {
      fallback: (
        <Delay>
          <FullHeight
            css={css`
              display: flex;
              align-items: center;
              justify-content: center;
            `}
          >
            <Spinner />
          </FullHeight>
        </Delay>
      ),
    },
  },
})

const App = ({ Component, pageProps }: AppProps) => {
  useSentry({
    dsn: env.SENTRY_DSN,
    allowUrls: ['https://slams.app', 'https://dev.slams.app'],
  })

  return (
    <>
      <Head>
        <title>함께 농구할 사람을 가장 쉽게 찾아보세요</title>
      </Head>
      <OpenGraph title="함께 농구할 사람을 가장 쉽게 찾아보세요" description="슬램 | 농구할 사람이 없다고?" />
      <SuspensiveProvider configs={suspensiveConfigs}>
        <RecoilRoot>
          <QueryClientProvider>
            <MediaQueryProvider>
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
            </MediaQueryProvider>
          </QueryClientProvider>
        </RecoilRoot>
      </SuspensiveProvider>
    </>
  )
}

export default App
