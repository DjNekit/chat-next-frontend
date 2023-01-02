import { Icon, IconProps } from "@chakra-ui/icons"
import { FC, memo } from "react"

export const SendIcon: FC<IconProps> = memo((props) => {
  return (
    <Icon
      height='30px'
      width='30px'
      viewBox="0 0 30 30"
      cursor='pointer'
      {...props}
    >
      <g transform="translate(0,-289.0625)">
        <path 
          stroke='none' 
          strokeWidth={2}
          strokeMiterlimit={4}
          strokeDasharray='none'
          strokeOpacity={1} 
          d="m 25.5,304.0625 c 0,-1.11962 -1,-1.5 -1,-1.5 l -20,-8 3.60352,8.56055 L 17.5,304.0625 8.10352,305.00195 4.5,313.5625 l 20,-8 c 0,0 1,-0.38038 1,-1.5 z" 
        />
      </g>
    </Icon>
  )
})