import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { motion } from "framer-motion"
import { FC, memo } from "react"

interface SearchProps {
  value?: string
  onChange: (value: string) => void
}

export const Search: FC<SearchProps> = memo(({ value, onChange }) => {
  return (
    <InputGroup zIndex={0}>
      <InputLeftElement
        pointerEvents='none'
        zIndex={0}
        children={<SearchIcon color='gray.300' />}
      />
      <Input
        value={value} 
        placeholder='Search'
        onChange={e => onChange(e.target.value)}
      />
      {value &&
        <InputRightElement
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => onChange('')}
          cursor='pointer' 
          children={<CloseIcon color='gray.300' />} 
        />
      }
    </InputGroup>
  )
})