import { ReactNode } from "react";

interface ModalActionsProps {
  children: ReactNode;
}

export default function ModalActions({ children }: ModalActionsProps) {
  return <div className="sticky bottom-0">{children}</div>;
}
