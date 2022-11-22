import { extendTheme, withDefaultProps } from "@chakra-ui/react";
import { colors } from "./colors";
import { config } from "./config";
import { components } from './components'
import { styles } from "./styles";

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