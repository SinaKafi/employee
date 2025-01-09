import { forwardRef, ReactNode } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalProps,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Heading,
  Divider,
} from "@chakra-ui/react";
import SVGCloseCircle from "@/components/svgs/SVGCloseCircle";
interface modalProps extends ModalProps {
  header?: string | ReactNode;
}
// Properly typed forwardRef component
const MyModal = forwardRef<HTMLDivElement, modalProps>((props, ref) => {
  const { children, isOpen, header, onClose, ...other } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} {...other}>
      <ModalOverlay />{" "}
      <ModalContent ref={ref} zIndex={""} className="!w-full">
        {typeof header == "string" && (
          <ModalCloseButton color={"alpha.800"} top="4">
            <SVGCloseCircle
              className="text-alpha-text10"
              width={18}
              height={18}
            />
          </ModalCloseButton>
        )}
        <ModalHeader className="flex flex-col gap-y-sm !px-base ">
          <Heading variant={"md"} className="ml-auto mt-sm">
            {header}
          </Heading>
          <Divider />
        </ModalHeader>
        <ModalBody className={`!p-base `}>{children}</ModalBody>
      </ModalContent>{" "}
    </Modal>
  );
});

MyModal.displayName = "MyModal";

export default MyModal;
