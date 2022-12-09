import { ReactNode, useCallback } from "react";
import { ChatLayout, Segment, Navbar, Loading } from "@/components";
import { useUser } from "@/hooks/useUser";
import { GridItem, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { api } from "@/api";
import { useRouter } from "next/router";

export default function ChatsPage() {
  const { user, isLoading, isError } = useUser({ 
    redirectOnLogout: true 
  })
  const router = useRouter() 

  const onLogout = useCallback(async () => {
    await api.logout()
    router.push('/signin')
  }, [])

  if (isLoading || isError) {
    return <Loading />
  }

  return (
    <>
      <GridItem rowSpan={3} colSpan={1}>
        <Navbar onLogout={onLogout} />
      </GridItem>
      <GridItem>
        <Segment>
          <InputGroup>
            <InputLeftElement
              pointerEvents='none'
              children={<SearchIcon color='gray.300' p={0} />}
            />
            <Input
              placeholder='Search'
              border='none'
              focusBorderColor='none'
            />
          </InputGroup>
        </Segment>
      </GridItem>
      <GridItem rowSpan={3}>
        <Segment padded>
          Chat
        </Segment>
      </GridItem>
      <GridItem>
        <Segment padded>Chat Group</Segment>
      </GridItem>
      <GridItem>
        <Segment padded>Contacts</Segment>
      </GridItem>
    </>
  )
}

ChatsPage.getLayout = function getLayout(page: ReactNode) {
  return (
    <ChatLayout title='Chats'>
      {page}
    </ChatLayout>
  )
}
