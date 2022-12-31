
import { memo, useCallback, useState } from "react"
import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import { Search, Menu, SearchResults, Chats } from "@/components"
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchMutation } from "@/redux/api/chat"

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

export const SidePanel = memo(() => {  
  const [searchValue, setSearchValue] = useState('')
  const [search, { data: searchUsers, isLoading }] = useSearchMutation()
  // const border = useColorModeValue('blackAlpha.400', 'whiteAlpha.300')

  const needShowResults = (searchValue: string) => {
    return searchValue.length > 2 ? true : false
  }

  const showData = needShowResults(searchValue)

  const onSeachChange = useCallback(async (value: string) => {
    if (needShowResults(value)) {
      search(value)
    }
    setSearchValue(value)
  }, [])

  return (
    <Flex
      flexDirection='column'
      h='100vh'
      layerStyle={['bg.main', 'border.right', 'padded.2-3']}
    >
      <Flex alignItems='center' gap={2}>
        <Menu />
        <Search value={searchValue} onChange={onSeachChange} />
      </Flex>
      <Box as={AnimatePresence} initial={false} mode='popLayout' h='100%'>
        <Box 
          as={motion.div}
          key={showData ? 'searchResults' : 'contacts'}
          variants={variants}
          initial='hidden'
          animate='show'
          exit='hidden'
          h='inherit'
          overflow='auto'
        >
          {showData
            ? <SearchResults results={searchUsers} isLoading={isLoading}/>
            : <Chats />
          }
        </Box>
      </Box>
    </Flex>
  )
})