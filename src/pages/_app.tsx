import React from "react"
import type { AppProps } from "next/app"
import Head from "next/head"
import { ThemeProvider } from "@emotion/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { DefaultLayout } from "~/components/domains/layout"
import { Image } from "~/components/uis/atoms"
import Providers from "~/contexts/Providers"
import emotionTheme from "~/styles/emotionTheme"

import "~/styles/global.css"

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Slam | 우리 주변 농구장을 빠르게</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <div style={{ position: "absolute", opacity: 0 }}>
          {[
            "/assets/basketball/animation_off_400.png",
            "/assets/basketball/animation_off_favorited.png",
            "/assets/basketball/fire_off_400.gif",
            "/assets/basketball/fire_off_all_tagged.gif",
            "/assets/basketball/fire_off_favorited.gif",
            "/assets/basketball/fire_off_reservated.gif",
            "/assets/basketball/fire_on_400.gif",
            "/assets/basketball/fire_on_all_tagged.gif",
            "/assets/basketball/fire_on_favorited.gif",
            "/assets/basketball/fire_on_reservated.gif",
            "/assets/basketball/only_ball_500.gif",
            "/assets/basketball/only_ball_500.png",
          ].map((url) => (
            <Image key={url} src={url} lazy width={1} height={1} alt={url} />
          ))}
        </div>
        <ThemeProvider theme={emotionTheme}>
          <Providers>
            <DefaultLayout>
              <Component {...pageProps} />
            </DefaultLayout>
          </Providers>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
