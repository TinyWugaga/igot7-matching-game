import { ReactNode } from 'react'
import { Flex, Heading, Stack } from '@chakra-ui/react'

import { DarkModeSwitch } from "@/components/DarkModeSwitch";

export const Hero = ({ title, children }:{ title?:string, children?:ReactNode}) => (
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
  >
    <Heading fontSize={["heading.sm", "heading.md", "heading.lg"]}>
      { title }
    </Heading>
    <Stack direction={['column', 'row']} spacing='24px'>
      {children}
      <DarkModeSwitch/>
    </Stack>
  </Flex>
)

// Hero.defaultProps = {
//   title: 'IGOT7 💚 Matching Game',
// }
