import clsx from "clsx";
import ErrorField from "./error-field";

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export default function Input({
  label,
  className,
  error,
  ...props
}: inputProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label className="text-sm font-semibold text-gray-600">{label}</label>
      )}

      <input
        {...props}
        className={clsx(
          "w-full px-4 py-3 border rounded-lg outline-none transition-all border-blue-100 focus:ring-1 focus:ring-blue-100",
          className
        )}
      />
      {error && <ErrorField>{error}</ErrorField>}
    </div>
  );
}
