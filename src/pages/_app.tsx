import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '@/theme'
import { wrapper } from '@/redux/store'

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
  ...rest
}: AppPropsWithLayout) {
  const defaultPage = (page: ReactElement) => page
  const getLayout = Component.getLayout ?? defaultPage;
  const { store, props } = wrapper.useWrappedStore(rest)

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        {getLayout(<Component {...props} />)}
      </ChakraProvider>
    </Provider>
  )
}
