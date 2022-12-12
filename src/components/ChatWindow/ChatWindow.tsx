import { Box } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import bg from '@/assets/images/chat-bg.png'

interface ChatProps {
  children?: ReactNode
}

export const ChatWindow: FC<ChatProps> = ({ children }) => {
  return (
    <Box 
      h='100%'
      bgGradient='linear(to-br, yellow.300, green.200, yellow.300)'
      _dark={{
        bgGradient: 'linear(to-br, black)'
      }}
    >
      <Box h='inherit' bgImg={`url(${bg.src})`}>
        {children}
      </Box>
    </Box>
  )
}