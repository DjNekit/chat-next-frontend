import type { AppProps } from 'next/app'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { Socket, io } from "socket.io-client";

import theme from '@/theme'
import { store } from '@/redux/store'
import { ChatsContext } from '@/contexts'
import { initialChatApi } from '@/lib/initialChatApi'

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
  const [chatChannel, setChatChannel] = useState<Socket | null>(null)

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API!)
    socket.on('connect', () => {
      setChatChannel(socket)
      socket.emit('events', { data: 'Hello from client' })
    })

    socket.on('message', (e) => {
      // console.log(e)
    })

    return () => {
      socket.disconnect()
      setChatChannel(null)
    }
  }, [])

  return (
    <Provider store={store}>
      <ChatsContext.Provider value={initialChatApi(chatChannel)}>
        <ChakraProvider theme={theme}>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </ChatsContext.Provider>
    </Provider>
  )
}
