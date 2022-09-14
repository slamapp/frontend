import '../styles/globals.css'
import type { AppProps } from 'next/app'
import index from '~/components'


function MyApp({ Component, pageProps }: AppProps) {
  console.log(index());

  return <Component {...pageProps} />
}

export default MyApp
