import { HamburgerIcon, MoonIcon, SettingsIcon } from "@chakra-ui/icons"
import { Flex, FormLabel, IconButton, Menu as ChakraMenu, MenuButton, MenuItem, MenuList, Switch, useColorMode } from "@chakra-ui/react"
import { ExitIcon } from "../Icons/ExitIcon"

export const Menu = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <ChakraMenu>
      <MenuButton
        padding='11px'
        as={IconButton}
        aria-label='Options'
        icon={<HamburgerIcon boxSize='18px' />}
        variant='link'
        borderRadius='100%'
        _hover={{
          bg: 'blackAlpha.100'
        }}
        _dark={{
          _hover: {
            bg: 'whiteAlpha.100'
          }
        }}
      />
      <MenuList>
        <MenuItem icon={<SettingsIcon />}>
          Settings
        </MenuItem>
        <MenuItem
          closeOnSelect={false}
          icon={<MoonIcon />}
          onClick={toggleColorMode}
        >
          <Flex justifyContent='space-between' alignItems='center'>
            <FormLabel htmlFor='dark' mb={0}>Dark mode</FormLabel>
            <Switch
              id='dark'
              isChecked={colorMode === 'dark'}
            />
          </Flex>
        </MenuItem>
        <MenuItem icon={<ExitIcon />}>
          Sign out
        </MenuItem>
      </MenuList>
    </ChakraMenu>
  )
}