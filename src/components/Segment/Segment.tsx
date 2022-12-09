import { Box } from "@chakra-ui/react"
import { FC, ReactNode } from "react"
import { motion } from 'framer-motion'

interface SegmentProps {
  children?: ReactNode
  padded?: boolean
}

export const Segment: FC<SegmentProps> = ({ padded, children }) => {
  return (
    <Box
      boxShadow='0px 1px 5px 1px rgba(0, 0, 0, 0.38)'
      borderRadius='lg'
      h='100%'
      p={padded ? 4 : ''}
    >
      {children}
    </Box>
  )
}