import { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import { type IconType } from "react-icons";
import clsx from "clsx";

interface ModalHeaderProps {
  title: ReactNode;
  Icon?: IconType;
  onClose: () => void;
  sticky?: boolean;
}

export default function ModalHeader({
  title,
  onClose,
  Icon,
  sticky = false,
}: ModalHeaderProps) {
  return (
    <div className={clsx(sticky ? "sticky top-0" : "relative", "bg-white")}>
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-black text-blue-600 flex items-center gap-2">
          {Icon ? <Icon /> : undefined}
          {title}
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="hover:rotate-90 transition-transform duration-300"
        >
          <FaTimes size={24} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
}
