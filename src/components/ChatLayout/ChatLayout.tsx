import Head from "next/head"
import { FC, memo, ReactNode } from "react"
import { Grid, GridItem } from "@chakra-ui/react"
import { Chat, Loading, SidePanel } from "@/components"
import { useUser } from "@/hooks/useUser"

interface ChatLayoutProps {
  title?: string
  children: ReactNode
}

export const ChatLayout: FC<ChatLayoutProps> = memo(({ title = 'Chats', children }) => {
  const { isLogout, isLoading } = useUser()

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