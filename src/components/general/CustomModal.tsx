import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ActionButton from "./ActionButton";
import LoadingButton from "./LoadingButton";

type CustomModalProps = {
  isOpen: boolean;
  onClose: () => void;
  handleSave?: () => void;
  title?: string;
  loading?: boolean;
  children?: JSX.Element;
};

const CustomModal = ({
  isOpen,
  onClose,
  handleSave,
  title,
  loading,
  children,
}: CustomModalProps): JSX.Element => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>
          <ModalFooter className="flex justify-end items-center gap-5">
            {loading ? (
              <LoadingButton />
            ) : (
              <ActionButton handleClick={handleSave} variant="solid">
                Submit
              </ActionButton>
            )}

            <ActionButton handleClick={onClose} variant="outline">
              Cancel
            </ActionButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CustomModal;
