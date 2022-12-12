
import { useCallback, useState } from "react"
import { Box, Center, Flex, ScaleFade, Text } from "@chakra-ui/react"
import { Search, Menu } from "@/components"
import { useSearch } from "@/hooks/useSearch"
import { AnimatePresence, motion } from 'framer-motion'

const variants = {
  show: {
    opacity: 1,
    scale: 1
  },
  hidden: {
    opacity: 0,
    scale: 0.8
  }
}

export const SidePanel = () => {
  const [searchValue, setSearchValue] = useState('')
  const { data, showData } = useSearch(searchValue)

  const onSeachChange = useCallback(async (value: string) => {
    setSearchValue(value)
  }, [])

  return (
    <Flex
      flexDirection='column'
      h='100vh'
      borderRightColor='blackAlpha.400'
      borderRightWidth={1}
      borderRightStyle='solid'
      p='0.4rem 0.8rem'
    >
      <Flex alignItems='center' gap={2}>
        <Menu />
        <Search value={searchValue} onChange={onSeachChange} />
      </Flex>
      <Box as={AnimatePresence} initial={false} mode='popLayout' h='100%'>
        <Box 
          as={motion.div}
          key={showData ? 'searchResults' : 'contacts'}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          h='inherit'

        >
          {showData
            ?
              <div>
                {data?.users.map((user: any) =>
                  <div key={user.id}>{user.name}</div>
                )}
              </div>
            :
              <Center h='inherit'>
                <Text>You don't have any active chats yet</Text>
              </Center>
          }
        </Box>
      </Box>
    </Flex>
  )
}