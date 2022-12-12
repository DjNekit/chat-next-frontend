import { SearchIcon } from "@chakra-ui/icons"
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react"

export const Search = () => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={<SearchIcon color='gray.300' />}
      />
      <Input placeholder='Search' />
    </InputGroup>
  )
}