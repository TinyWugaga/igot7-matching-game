import { Flex, FlexProps } from '@chakra-ui/react'

export const Footer = (props: FlexProps) => (
  <Flex 
    as="footer"
    position="relative"
    height={["footer.sm", "footer.md", "footer.lg"]}
    py={["footer.sm", "footer.md", "footer.lg"]}
    pt={["1.8rem", "3.6rem", "3rem"]}
    bottom="0"
    {...props}
  />
)
