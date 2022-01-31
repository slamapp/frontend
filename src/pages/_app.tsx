import type { AppProps } from "next/app";
import { DefaultLayout } from "@components/layout";
import Providers from "@contexts/Providers";
import Head from "next/head";
import { ThemeProvider } from "@emotion/react";
import theme from "@styles/theme";
import "@styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Slam | 우리 주변 농구장을 빠르게</title>
        <meta property="og:image" content="/link_image.png" />
        <meta property="og:title" content="슬램" />
        <meta name="description" content="우리 주변 농구장을 빠르게" />
        <meta property="og:description" content="우리 주변 농구장을 빠르게" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <Providers>
          <DefaultLayout>
            <Component {...pageProps} />
          </DefaultLayout>
        </Providers>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
