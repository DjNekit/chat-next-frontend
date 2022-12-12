import Head from "next/head"
import { FC, memo, ReactNode, useCallback } from "react"
import { Flex, Grid, GridItem } from "@chakra-ui/react"
import { Chat, Loading, SidePanel } from "@/components"
import { useUser } from "@/hooks/useUser"
import { api } from "@/api"

interface ChatLayoutProps {
  title?: string
  children: ReactNode
}

export const ChatLayout: FC<ChatLayoutProps> = memo(({ title = 'Chats', children }) => {
  const { user, isLogout, isLoading, mutate } = useUser()

  const onLogout = useCallback(async () => {
    await api.logout()
    mutate()
  }, [])

  if (isLoading || isLogout) {
    return <Loading />
  }
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Grid templateColumns='1fr 2fr'>
        <GridItem>
          <SidePanel />
        </GridItem>
        <GridItem>
          <Chat>{children}</Chat>
        </GridItem>
        
      </Grid>
    </>
  )
})