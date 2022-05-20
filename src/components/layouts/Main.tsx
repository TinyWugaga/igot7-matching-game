import { Stack, StackProps } from '@chakra-ui/react'

export const Main = (props: StackProps) => (
  <Stack
    position="relative"
    spacing="1.5rem"
    width="100%"
    height={["mainHeight.sm", "mainHeight.md", "mainHeight.lg"]}
    maxWidth={["90vw", "86vw"]}
    pt={["1rem", "2rem"]}
    px={["1rem", "3rem"]}
    {...props}
  />
)
