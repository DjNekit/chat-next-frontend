import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { SWRConfig } from 'swr'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '@/theme'
import { fetcher } from '@/lib/fetcher'
import { PUBLIC_ROUTES } from '@/constants'
import { store } from '@/redux/store'

import '@fontsource/open-sans/700.css'
import '@fontsource/raleway/400.css'



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({
  Component,
  pageProps
}: AppPropsWithLayout) {
  const defaultPage = (page: ReactElement) => page
  const getLayout = Component.getLayout ?? defaultPage;
  const router = useRouter()

  const onSWRError = (err: any) => {
    const isPublicRoute = PUBLIC_ROUTES.includes(router.pathname)
    const status = err?.response.status
    if (status === 401 && !isPublicRoute) {
      router.replace('/signin')
    }
  }

  return (
    <Provider store={store}>
      <SWRConfig
        value={{
          fetcher,
          shouldRetryOnError: false,
          onError: onSWRError
        }}
      >
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </SWRConfig>
    </Provider>
  )
}
