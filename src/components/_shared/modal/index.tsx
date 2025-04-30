/** @format */

"use client";
import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { Drawer } from "vaul";
import { cn } from "@/_shared/cn";
import { CommonProps } from "@/types/type";

interface ModalProps extends CommonProps {
  showModal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  preventDefaultClose?: boolean;
  showCloseIcon?: boolean;
  useDrawer?: boolean;
  onKeyDown?: (e: React.KeyboardEvent) => void;
}

export const Modal = (props: ModalProps) => {
  const {
    showModal,
    className,
    setShowModal,
    showCloseIcon,
    onClose,
    preventDefaultClose,
    children,
    useDrawer,
    onKeyDown,
  } = props;

  const closeModal = () => {
    if (preventDefaultClose) {
      return;
    }
    onClose?.();
    setShowModal?.(false);
  };

  const handleVisibility = (open: boolean) => {
    if (!open) {
      closeModal();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    onKeyDown?.(e);

    // Only prevent Enter key default behavior if not in a form element
    if (
      e.key === "Enter" &&
      !(
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLButtonElement
      )
    ) {
      e.preventDefault();
    }
  };

  const sharedContentProps = {
    className: cn(
      "fixed inset-0 z-40 m-auto max-h-fit w-full max-w-md overflow-hidden border border-gray-200 bg-white p-0 shadow-xl sm:rounded-2xl",
      className
    ),
    onKeyDown: handleKeyDown,
  };

  const CloseButton = () =>
    showCloseIcon ? (
      <Dialog.Close className="absolute right-4 top-4 rounded opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </Dialog.Close>
    ) : null;

  return (
    <>
      {useDrawer ? (
        <Drawer.Root
          open={setShowModal ? showModal : false}
          onOpenChange={handleVisibility}
        >
          <Drawer.Overlay className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto max-h-screen grid place-items-center" />
          <Drawer.Portal>
            <Drawer.Content {...sharedContentProps}>
              {children}
              <CloseButton />
            </Drawer.Content>
            <Drawer.Overlay />
          </Drawer.Portal>
        </Drawer.Root>
      ) : (
        <Dialog.Root
          open={setShowModal ? showModal : false}
          onOpenChange={handleVisibility}
        >
          <Dialog.Portal>
            <Dialog.Overlay
              id="modal-backdrop"
              className="fixed inset-0 z-50 backdrop-blur-[2px] bg-black bg-opacity-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 overflow-y-auto max-h-screen grid place-items-center px-4"
            >
              <Dialog.Content
                {...sharedContentProps}
                onOpenAutoFocus={(e) => e.preventDefault()}
                onCloseAutoFocus={(e) => e.preventDefault()}
              >
                {children}
                <CloseButton />
              </Dialog.Content>
            </Dialog.Overlay>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </>
  );
};
