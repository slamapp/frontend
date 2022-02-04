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
