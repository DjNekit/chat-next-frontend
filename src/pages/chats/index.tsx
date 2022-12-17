import Head from "next/head";
import { Grid, GridItem } from "@chakra-ui/react";
import { useUser } from "@/hooks/useUser";
import { ChatWindow, Loading, SidePanel } from "@/components";

export default function ChatsPage() {
  const { isLogout, isLoading } = useUser()

  if (isLoading || isLogout) {
    return <Loading />
  }

  return (
    <>
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
    </>
  )
}
