import { Flex, Heading } from '@chakra-ui/react'

import { DarkModeSwitch } from "@/components/DarkModeSwitch";

export const Hero = ({ title }: { title: string }) => (
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
    <Heading fontSize={["1.8em", "3.2em", "4em"]}>
      {title}
      <DarkModeSwitch/>
    </Heading>
  </Flex>
)

Hero.defaultProps = {
  title: 'IGOT7 💚 Matching Game',
}
