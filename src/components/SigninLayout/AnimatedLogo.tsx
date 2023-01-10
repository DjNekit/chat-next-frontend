import { Box, Flex, Text } from '@chakra-ui/react'
import { Link } from '@/components'
import s from './style.module.scss' 

export const AnimatedLogo = () => {
  return (
    <Box className={s.logo}>
      <Flex 
        as={Link}
        href='/'
        color='white'
        _hover={{
          color: 'white',
          transform: 'scale(1.01)',
          transition: 'all .4s ease-out'
        }}
        fontSize={[35, 50, 50, 70, 100]} 
        gap={5} 
        cursor='pointer'
      >
        <Text className={`${s.animate} ${s.delay1}`}>F</Text>
        <Text className={`${s.animate} ${s.delay2}`}>R</Text>
        <Text className={`${s.animate} ${s.delay3}`}>E</Text>
        <Text className={`${s.animate} ${s.delay4}`}>E</Text>
        <Text className={`${s.animate} ${s.delay5}`}>D</Text>
        <Text className={`${s.animate} ${s.delay6}`}>O</Text>
        <Text className={`${s.animate} ${s.delay7}`}>M</Text>
      </Flex>
    </Box>
  )
}