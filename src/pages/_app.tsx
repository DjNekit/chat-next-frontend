import { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@/theme'
import '@fontsource/raleway/400.css'
import '@fontsource/open-sans/700.css'
import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetcher'
import { useRouter } from 'next/router'



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
  
  return (
    <SWRConfig
      value={{
        fetcher,
        // revalidateOnFocus: false,
        shouldRetryOnError: false,
        onError(err, key, config) {
          const status = err?.response.status
          if (status === 401) {
            router.replace('/signin')
          }
        },
        
      }}
    >
      <ChakraProvider theme={theme}>
        {getLayout(<Component {...pageProps} />)}
      </ChakraProvider>
    </SWRConfig>
  )
}
