import { ReactNode } from "react";
import Loader from "./loader";

type ButtonVariant = "primary" | "danger" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
  children: React.ReactNode;
  endIcon?: ReactNode;
}

export default function Button({
  variant = "primary",
  loading = false,
  children,
  className,
  disabled,
  endIcon ,
  ...props
}: ButtonProps) {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200",
    danger: "bg-red-500 hover:bg-red-600 text-white shadow-red-100",
    outline:
      "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 shadow-none",
  };

  const isDisabled = disabled || loading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`relative flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
        font-bold transition-all duration-200 shadow-lg active:scale-95
        disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 
        w-full
        ${variants[variant]} 
        ${className}`}
    >
      {children}
      {loading ? (
        <div className="flex items-center">
          <Loader />
        </div>
      ) : (
        endIcon
      )}
    </button>
  );
}
