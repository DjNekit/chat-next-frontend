import { ReactNode } from "react";
import { ChatLayout, Segment, Navbar } from "@/components";
import { useUser } from "@/hooks/useUser";
import { GridItem, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { api } from "@/api";

export default function ChatsPage() {
  const { user, isLoading, isError, mutate } = useUser({ 
    redirectOnLogout: true 
  })

  const onLogout = async () => {
    await api.logout()
    mutate()
  }

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    return <h1>Redirect...</h1>
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
        <Segment>
          Chat
        </Segment>
      </GridItem>
      <GridItem>
        <Segment>Chat Group</Segment>
      </GridItem>
      <GridItem>
        <Segment>Contacts</Segment>
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