import { FC, memo, useRef } from "react"
import { Box, Flex, IconButton, ScaleFade, useColorMode, useDisclosure, useOutsideClick } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { SmileIcon } from "../Icons/SmileIcon";

interface MessageInputProps { }

export const MessageInput: FC<MessageInputProps> = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { colorMode } = useColorMode()
  const messRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  useOutsideClick({
    ref: ref,
    handler: onClose,
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
          as={ScaleFade}
          initialScale={0.7}
          in={isOpen}
          pos='absolute'
          bottom='68px'
          left='-3px'
          unmountOnExit
        >
          <EmojiPicker
            height='50vh'
            theme={colorMode as any}
            onEmojiClick={onEmojiClick}
            previewConfig={{
              showPreview: false
            }}
            searchDisabled
          />
        </Box>
        <SmileIcon onClick={!isOpen ? onOpen : undefined} />
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