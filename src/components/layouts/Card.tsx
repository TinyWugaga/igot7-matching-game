import { AspectRatio, AspectRatioProps } from "@chakra-ui/react";

export const Card = (props: AspectRatioProps) => (
  <AspectRatio
    position="absolute"
    width="100%"
    height="100%"
    overflow="hidden"
    rounded="lg"
    bg="teal.500"
    bgGradient="linear(to-tr, blackAlpha.400 0%, blackAlpha.300 32%,  whiteAlpha.200 60%, whiteAlpha.400 85%)"
    borderColor="whiteAlpha.500"
    borderWidth="0.15rem"
    _hover={{
      borderColor: "whiteAlpha.800",
    }}
    ratio={[4 / 3, 3 / 4, 2 / 3]}
    {...props}
  />
);
