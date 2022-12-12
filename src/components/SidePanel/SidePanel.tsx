
import { Box, Flex } from "@chakra-ui/react"
import { Search, Menu } from "@/components"

export const SidePanel = () => {
  return (
    <Box 
      h='100vh' 
      borderRightColor='blackAlpha.400'
      borderRightWidth={1}
      borderRightStyle='solid'
      p='0.4rem 0.8rem'
    >
      <Flex alignItems='center' gap={2}>
        <Menu />
        <Search />
      </Flex>
    </Box>
  )
}