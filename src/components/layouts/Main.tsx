import { Stack, StackProps } from '@chakra-ui/react'

export const Main = (props: StackProps) => (
  <Stack
    position="absolute"
    spacing="1.5rem"
    width="100%"
    maxWidth={["52rem", "65vw"]}
    maxHeight="80vh"
    top="8vw"
    pt={["1rem", "3rem"]}
    px="1rem"
    {...props}
  />
)
