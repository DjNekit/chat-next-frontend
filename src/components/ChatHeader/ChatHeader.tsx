import { FC, memo } from "react";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useIsMobile } from "@/hooks/useMobile";
import { chatActions } from "@/redux/slices/chat.slice";

interface ChatHeaderProps {
  name?: string
}

export const ChatHeader: FC<ChatHeaderProps> = memo(({ name = '' }) => {
  const dispatch = useAppDispatch()
  const isMobile = useIsMobile()

  const backClick = () => {
    dispatch(chatActions.setChat(null))
  }
  
  return (
    <Flex
      alignItems='center'
      gap={3}
      px={4}
      py={2}
      layerStyle={['bg.main']}
      boxShadow='lg'
    >
      {isMobile && 
        <ArrowBackIcon 
          boxSize={6}
          cursor='pointer'
          onClick={backClick}
        />
}
      <Avatar size={isMobile ? 'sm' : 'md'} name={name}/>
      <Text>{name}</Text>
    </Flex>
  )
})