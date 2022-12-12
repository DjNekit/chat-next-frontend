import { Box } from "@chakra-ui/react"
import { FC, ReactNode } from "react"

interface ChatProps {
  children?: ReactNode
}

export const Chat: FC<ChatProps> = ({ children }) => {
  return (
    <Box 
      height='100%'
    >
      {children}
    </Box>
  )
}