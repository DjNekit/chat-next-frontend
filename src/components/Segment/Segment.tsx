import { Box } from "@chakra-ui/react"
import { FC, ReactNode } from "react"

interface SegmentProps {
  children?: ReactNode
}

export const Segment: FC<SegmentProps> = ({ children }) => {
  return (
    <Box 
      boxShadow='0px 4px 5px 2px rgba(121, 197, 239, 0.38)'
      borderRadius='lg'
      h='100%'
      // p='21px 22px'
    >
      {children}
    </Box>
  )
}