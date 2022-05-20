import { Flex, Heading } from '@chakra-ui/react'

import { DarkModeSwitch } from "@/components/DarkModeSwitch";

export const Hero = ({ title }: { title: string }) => (
  <Flex
    position="absolute"
    top="0"
    left="0"
    justifyContent="center"
    alignItems="center"
    width="100vw"
    height="8vw"
    bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
    bgClip="text"
  >
    <Heading fontSize="3.6vw">
      {title}
      <DarkModeSwitch/>
    </Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'IGOT7 💚 Matching Game',
}
