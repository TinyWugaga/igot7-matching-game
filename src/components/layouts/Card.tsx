import { AspectRatio, AspectRatioProps } from '@chakra-ui/react'

export const Card = (props: AspectRatioProps) => (
  <AspectRatio
    position = "absolute"
    width= "100%"
    height= "100%"
    bg="green.500"
    bgGradient="linear(45deg, teal.500 45%, green.500)"
    ratio={[4/3, 3/4, 2/3]}
    {...props}
  />
)
