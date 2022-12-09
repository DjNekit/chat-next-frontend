import { ReactNode, useCallback } from "react";
import { GridItem, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { ChatLayout, Segment, Navbar, Loading } from "@/components";
import { useUser } from "@/hooks/useUser";
import { api } from "@/api";

export default function ChatsPage() {
  const { user, isLogout, isLoading, mutate } = useUser()
  console.log('chat')


  const onLogout = useCallback(async () => {
    await api.logout()
    mutate()
  }, [])

  if (isLoading || isLogout) {
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
