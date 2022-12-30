import Head from "next/head";
import dynamic from "next/dynamic";
import { Grid, GridItem } from "@chakra-ui/react";
import { ChatWindow, SidePanel } from "@/components";

const AuthGuard = dynamic(() => 
  import('@/hoc/AuthGuard').then(mod => mod.AuthGuard)
)

export default function ChatsPage() {
  console.log('chats')

  return (
    <AuthGuard>
      <Head>
        <title>Chats</title>
      </Head>

      <Grid templateColumns='1fr 2fr'>
        <GridItem>
          <SidePanel />
        </GridItem>
        <GridItem>
          <ChatWindow />
        </GridItem>
      </Grid>
    </AuthGuard>
  )
}

