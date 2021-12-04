import type { AppProps } from "next/app";
import { DefaultLayout } from "@components/layout";
import Providers from "@contexts/Providers";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <DefaultLayout>
        <Component {...pageProps} />
      </DefaultLayout>
    </Providers>
  );
}

export default MyApp;
