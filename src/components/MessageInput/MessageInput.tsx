import { FC, memo, useRef } from "react"
import { Box, Flex, IconButton, useColorMode, useDisclosure, useOutsideClick } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { SmileIcon } from "../Icons/SmileIcon";
import { useAppSelector } from "@/hooks/useAppSelector";

interface MessageInputProps { }

export const MessageInput: FC<MessageInputProps> = memo(() => {
  const { isOpen, onToggle, onClose, onOpen } = useDisclosure()
  const { colorMode } = useColorMode()
  const messRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const isAuth = useAppSelector(state => state.auth.isAuth)

  const outsideClickHandle = (e: Event) => {
    const element = e.target as HTMLElement
    const isSmileIcon = element.classList.contains('smile-icon')
    !isSmileIcon && onClose()
  }

  useOutsideClick({
    ref: ref,
    handler: outsideClickHandle
  })


  const onEmojiClick = ({ emoji }: EmojiClickData) => {
    if (messRef.current) {
      messRef.current.innerText += emoji
    }
  }

  return (
    <Flex
      maxW='685px'
      margin='0 auto'
      gap={3}
      px={5}
      pb={4}
    >
      <Flex
        layerStyle='bg.main'
        w='100%'
        borderRadius='3xl'
        py={3}
        px={5}
        gap={5}
        alignItems='flex-end'
        pos='relative'
      >
        <Box
          ref={ref}
          transition='all .3s ease-out'
          opacity={isOpen ? 1 : 0}
          visibility={isOpen ? 'visible' : 'hidden'}
          transform={`scale(${isOpen ? 1 : 0.7})`}
          pos='absolute'
          bottom='68px'
          left='-3px'
        >
          {isAuth &&
            <EmojiPicker
              height='50vh'
              theme={colorMode as any}
              onEmojiClick={onEmojiClick}
              previewConfig={{
                showPreview: false
              }}
              searchDisabled
            />
          }
        </Box>
        <SmileIcon className='smile-icon' onClick={onToggle} />
        <Box
          ref={messRef}
          w='100%'
          contentEditable
          wordBreak='break-all'
          outline='none'
        />
      </Flex>
      <IconButton
        borderRadius='full'
        colorScheme='blue'
        aria-label='Search database'
        size='lg'
        mb='2px'
        icon={<SearchIcon />}
      />
    </Flex>
  )
})