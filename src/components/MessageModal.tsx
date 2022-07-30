import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

type MessageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
};

export const MessageModal = ({
  isOpen,
  onClose,
  title = 'Hello!',
  message = '',
}: MessageModalProps) => {
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          fontFamily={"IBM Plex Sans"}
          fontSize={"2xl"}
          textAlign="center"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text maxW="80vw" fontSize={"1em"} textAlign="center" margin="auto" fontWeight={400}>
            {message}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
