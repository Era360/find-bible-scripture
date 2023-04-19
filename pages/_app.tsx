import '@/styles/globals.css'
import { ProvideAuth } from '@/utils/use-auth'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <ProvideAuth>
    <Component {...pageProps} />
  </ProvideAuth>
}
