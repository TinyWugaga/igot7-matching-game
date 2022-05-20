import { AspectRatio, AspectRatioProps } from '@chakra-ui/react'

export const Card = (props: AspectRatioProps) => (
  <AspectRatio
    position = "relative"
    ratio={[4/3, 3/4]}
    {...props}
  />
)
