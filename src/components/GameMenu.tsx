import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

export const GameMenu = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={false}
      onClose={onClose}
      size="md"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>GOT7 Matching Game</ModalHeader>
        <ModalBody pb={6}>
          <Button bgColor="ahgasae" color="gray.700" mr={3}>
            START GAME
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
