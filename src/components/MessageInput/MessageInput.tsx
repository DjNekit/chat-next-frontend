import { FC, memo, useRef } from "react"
import { Box, Flex, Grid, GridItem, IconButton, Input, ScaleFade, useColorMode, useDisclosure, useOutsideClick } from "@chakra-ui/react"
import { SearchIcon } from "@chakra-ui/icons"
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { SmileIcon } from "../Icons/SmileIcon";

interface MessageInputProps { }

export const MessageInput: FC<MessageInputProps> = memo(() => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { colorMode } = useColorMode()
  const messRef = useRef<any>(null)
  const ref = useRef<any>(null)
  useOutsideClick({
    ref: ref,
    handler: onClose,
  })

  const onEmojiClick = ({ emoji }: EmojiClickData) => {
    messRef.current.innerText += emoji
  }

  return (
    <Grid
      p={4}
      gridTemplateColumns='48px 1fr 48px'
      gap={2}
      m='0 auto'
      width={{
        lg: '80%'
      }}
    >
      <GridItem></GridItem>
      <GridItem as={Flex} gap={2} alignItems='flex-end'>
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
      </GridItem>
      <GridItem></GridItem>
    </Grid>
  )
})