import type { AppProps } from "next/app";
import { DefaultLayout } from "@components/layout";
import Providers from "@contexts/Providers";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Slam | 우리 주변 농구장을 빠르게</title>
        <meta property="og:image" content="/public/link_image.png" />
        <meta property="og:title" content="슬램" />
        <meta name="description" content="우리 주변 농구장을 빠르게" />
        <meta property="og:description" content="우리 주변 농구장을 빠르게" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>
      <Providers>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </Providers>
    </>
  );
}

export default MyApp;
