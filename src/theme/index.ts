import { extendTheme, withDefaultProps } from "@chakra-ui/react";
import { colors } from "./colors";
import { config } from "./config";
import { components } from './components'
import { styles } from "./styles";
import { borderRadius } from "./borderRadius";
import { layerStyles } from './layerStyles';

export default extendTheme(
  {
    config,
    colors,
    styles,
    ...borderRadius,
    components,
    layerStyles
  },
  withDefaultProps({
    defaultProps: {
      colorScheme: 'telegram',
    },
    components: ['Button']
  }),
)