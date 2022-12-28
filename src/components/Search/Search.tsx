import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { FC, memo } from "react"

interface SearchProps {
  value?: string
  onChange: (value: string) => void
}

export const Search: FC<SearchProps> = memo(({ value, onChange }) => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents='none'
        children={<SearchIcon color='gray.300' />}
      />
      <Input
        value={value} 
        placeholder='Search'
        onChange={e => onChange(e.target.value)}
      />
      {value &&
        <InputRightElement
          onClick={() => onChange('')}
          cursor='pointer' 
          children={<CloseIcon color='gray.300' />} 
        />
      }
    </InputGroup>
  )
})