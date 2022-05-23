import {
  AspectRatio,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
} from "@chakra-ui/react";

type VideoModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const VideoModal = ({ isOpen, onClose }:VideoModalProps) => {
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
          GOT7 HOME COMING!
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <AspectRatio maxW="80vw" ratio={16 / 9}>
            <iframe
              title="got7 nanana"
              src="https://www.youtube.com/embed/IZ0oQ6nzKxo"
              allowFullScreen
            />
          </AspectRatio>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
