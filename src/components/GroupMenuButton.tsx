import {
  IconButton,
  Button,
  ButtonGroup,
  Stack,
  keyframes,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

type GroupMenuButtonProps = {
  groups: PuzzleGroup[];
  onClick: (groupId: number) => void;
};

export const GroupMenuButton = ({ groups, onClick }: GroupMenuButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const buttonAnimationKeyframes = keyframes`
    0% { transform: scale(1) translateY(0);}
    50% { transform: scale(1.1) translateY(-12px);}
    100% { transform: scale(1) translateY(0);}
  `;

  const buttonAnimation = (index: number) =>
    `${buttonAnimationKeyframes} 0.3s ease-out ${0.15 * (index - 1)}s`;

  return (
    <Stack
      direction={"column"}
      width="auto"
      maxWidth="3xl"
      spacing="1rem"
    >
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Menu"
        bgColor="green.500"
        bgGradient="linear(to-r, teal.500, green.500)"
        color="whiteAlpha.900"
        width="fit-content"
        margin={'auto'}
        onClick={isOpen ? onClose : onOpen}
      />

      {Boolean(groups.length && isOpen) && (
        <ButtonGroup
          position="absolute"
          width="auto"
          maxWidth="16em"
          flexWrap={'wrap'}
          top={[16, 28]}
          right={4}
          px={["toolbar.x", "0"]}
          spacing="1rem"
          borderRadius={"0.4em"}
          bgColor="containerMask"
        >
          {groups.map((group, index) => (
            <Button
              key={group.id}
              as={motion.div}
              position="relative"
              margin="0 auto"
              aria-label="Next Game"
              bgImage="url('assets/ahagsae_ai.png')"
              bgSize="contain"
              bgPosition="center"
              bgRepeat="no-repeat"
              bgColor="transparent"
              color="whiteAlpha.900"
              cursor="pointer"
              _hover={{
                bgColor: "transparent",
              }}
              _active={{
                bgColor: "transparent",
              }}
              // Motion Animation
              animation={buttonAnimation(groups.length - index)}
              whileHover={{ scale: 1.4, translateY: "-2px" }}
              whileTap={{ scale: 1.3, translateY: "-12px" }}
              transition="0.12s linear"
              onClick={() => onClick(group.id)}
            >
              {group.id}
            </Button>
          ))}
        </ButtonGroup>
      )}     
    </Stack>
  );
};
