import { defineStyleConfig, extendTheme, withDefaultProps } from "@chakra-ui/react";
import { colors } from "./colors";
import { config } from "./config";
import { components } from './components'

const styles = {
  global: {
    a: {
      _hover: {
        textDecoration: 'none !important',
      },
    }
  }
}

export default extendTheme(
  { 
    config,
    colors,
    styles,
    components,
  },
  withDefaultProps({
    defaultProps: {
      colorScheme: 'brand',
    },
    components: ['Button']
  }),
)