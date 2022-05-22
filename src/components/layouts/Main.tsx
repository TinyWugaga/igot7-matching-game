import { Stack, StackProps } from '@chakra-ui/react'

export const Main = (props: StackProps) => (
  <Stack
    position="relative"
    spacing="1.5rem"
    width="100%"
    height={["main.height.sm", "main.height.md", "main.height.lg"]}
    maxWidth={["main.width.sm", "main.width.md", "main.width.lg"]}
    pt={["1rem", "2rem"]}
    px={["1rem", "3rem"]}
    {...props}
  />
)
