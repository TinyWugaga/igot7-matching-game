import { ReactNode } from 'react'
import { Flex, Stack } from '@chakra-ui/react'

export const Hero = ({ children }:{ children?:ReactNode}) => (
  <Flex
    position="relative"
    top="0"
    left="0"
    justifyContent="center"
    alignItems="center"
    width="100vw"
    height={["header.sm", "header.md", "header.lg"]}
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
    zIndex="500"
  >
    <Stack direction={['column', 'row']} spacing='24px'>
      {children}
    </Stack>
  </Flex>
)

// Hero.defaultProps = {
//   title: 'IGOT7 💚 Matching Game',
// }
