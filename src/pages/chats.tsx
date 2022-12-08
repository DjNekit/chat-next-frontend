import { ReactNode } from "react";
import Router from "next/router";
import { Link, ChatLayout, Segment } from "@/components";
import { useUser } from "@/hooks/useUser";
import { GridItem, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { PhoneIcon, SearchIcon } from "@chakra-ui/icons";

export default function ChatsPage() {
  const { user, isLoading, isError } = useUser({ redirect: true })

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  if (isError) {
    Router.replace('/signin')
    return <h1>Redirect...</h1>
  }

  return (
    <>
      <GridItem>
        <Segment>
          <InputGroup>
            <InputLeftElement 
              pointerEvents='none'
              children={<SearchIcon color='gray.300' p={0}/>}
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