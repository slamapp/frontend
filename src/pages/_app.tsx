import type { AppProps } from "next/app";
import { DefaultLayout } from "@components/layout";
import Providers from "@contexts/Providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
          integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <Providers>
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </Providers>
    </>
  );
}

export default MyApp;
