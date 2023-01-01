import Head from "next/head";
import dynamic from "next/dynamic";
import { Grid, GridItem } from "@chakra-ui/react";
import { ChatWindow, SidePanel } from "@/components";
import { useAppSelector } from "@/hooks/useAppSelector";

const AuthGuard = dynamic(() =>
  import('@/hoc/AuthGuard').then(mod => mod.AuthGuard)
)

export default function ChatsPage() {
  const activeChat = useAppSelector(state => state.chat.activeChat)

  return (
    <AuthGuard>
      <Head>
        <title>Chats</title>
      </Head>

      <Grid
        overflow='hidden'
        pos='relative'
        templateColumns={{
          lg: '1fr 2fr',
          sm: '2fr 3fr',
          base: '1fr'
        }}
      >
        <GridItem>
          <SidePanel />
        </GridItem>
        <GridItem
          pos={{
            base: 'absolute',
            sm: 'static'
          }}
          left={activeChat ? 0 : '100%'}
          transition='left .3s ease-out'
          w={{
            base: '100vw',
            sm: 'auto'
          }}
          h={{
            base: '100vh',
            sm: 'auto'
          }}
        >
          <ChatWindow />
        </GridItem>
      </Grid>
    </AuthGuard>
  )
}

