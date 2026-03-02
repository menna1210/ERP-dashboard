import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnEscape?: boolean;
}

export default function Modal({
  children,
  open,
  onClose,
  closeOnEscape = true,
}: ModalProps) {
  const [isScale, setIsScale] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  useEffect(() => {
    if (isScale) {
      setTimeout(() => {
        setIsScale(false);
      }, 500);
    }
  }, [isScale]);

  function handleKeyboardCloseModal(e: KeyboardEvent) {
    if (e.key === "Escape") {
      onClose();
    }
  }

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    document.body.addEventListener("keydown", handleKeyboardCloseModal);

    return () => {
      document.body.removeEventListener("keydown", handleKeyboardCloseModal);
    };
  }, [open, closeOnEscape]);

  return createPortal(
    <div className="absolute inset-0 w-full h-full z-50">
      <div
        className={clsx(
          open ? "opacity-100 visible" : "opacity-0 invisible",
          "absolute inset-0 bg-black/70 backdrop-blur-sm  text-right z-2 transition-opacity"
        )}
        onClick={() => onClose()}
      />
      <div
        className={clsx(
          "z-10 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-162.5 transition-all duration-500",
          isScale ? "scale-105" : "scale-100",
          open ? "scale-100 opacity-100" : "scale-95 opacity-95"
        )}
      >
        <div className="bg-white w-full rounded-[30px] p-8 space-y-5 shadow-2xl overflow-y-auto max-h-[90vh]">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
