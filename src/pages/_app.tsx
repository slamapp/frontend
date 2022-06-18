import React from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "@emotion/react"
import { DefaultLayout } from "~/components/domains/layout"
import Providers from "~/contexts/Providers"
import emotionTheme from "~/styles/emotionTheme"

import "~/styles/global.css"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Slam | 우리 주변 농구장을 빠르게</title>
      </Head>
      <ThemeProvider theme={emotionTheme}>
        <Providers>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </Providers>
      </ThemeProvider>
    </>
  )
}

export default MyApp
