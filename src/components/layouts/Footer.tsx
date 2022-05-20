import { Flex, FlexProps } from '@chakra-ui/react'

export const Footer = (props: FlexProps) => (
  <Flex 
    as="footer"
    position="absolute"
    maxHeight="10vh"
    bottom="0"
    py="3rem"
    {...props}
  />
)
