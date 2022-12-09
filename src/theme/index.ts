import { extendTheme, withDefaultProps } from "@chakra-ui/react";
import { colors } from "./colors";
import { config } from "./config";
import { components } from './components'
import { styles } from "./styles";
import { borderRadius } from "./borderRadius";

export default extendTheme(
  { 
    config,
    colors,
    styles,
    ...borderRadius,
    components,
  },
  withDefaultProps({
    defaultProps: {
      colorScheme: 'brand',
    },
    components: ['Button']
  }),
)