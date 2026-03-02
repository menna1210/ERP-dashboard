import clsx from "clsx";
import { ChangeEvent, useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import Button from "../../../components/ui/button";
import ErrorField from "../../../components/ui/error-field";
import Input from "../../../components/ui/input";
import { Store } from "../../../services/inventoryService";
import { useInventory } from "../hooks/useInventory";
import { useEffect } from "react";
interface Props {
  isOpen: boolean;
  onClose: () => void;
  updatedData?: Store;
}

type ErrorField = {
  name?: string;
  root?: string;
};

export default function AddStore({ isOpen, onClose, updatedData }: Props) {
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ErrorField>({});
  const { handleAddStore, handleUpdate } = useInventory();

  useEffect(() => {
    if (!updatedData) return;
    setName(updatedData.name);
  }, [updatedData]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setName(value);
  }

  function handleReset() {
    setName("");
    setErrors({});
  }

  function handleValidation() {
    let errors: ErrorField = {};
    if (!name) {
      errors.name = "هذا الحقل مطلوب";
    }
    setErrors(errors);
    return Object.values(errors).length == 0;
  }

  const handleSubmit = async () => {
    if (!handleValidation()) return;
    setIsSubmitting(true);
    try {
      if (updatedData) {
        await handleUpdate(updatedData.id, { name });
      } else {
        await handleAddStore(name);
      }
      handleReset();
      onClose();
    } catch (err) {
      setErrors({ root: err as string });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className={clsx(
        isOpen ? "visible opacity-100" : "invisible opacity-0",
        "fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 font-sans text-right duration-200"
      )}
    >
      <div
        className={clsx(
          isOpen ? "scale-100" : "scale-95",
          "bg-white rounded-[30px] p-8 w-full max-w-md shadow-2xl duration-300"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-800">
            إضافة مخزن جديد
          </h2>
          <button
            onClick={() => {
              onClose();
              handleReset();
            }}
           className="hover:rotate-90 transition-transform duration-300 text-gray-500"
          >
            <FaTimes size={24} />
          </button>
        </div>

        <Input
          value={name}
          onChange={handleChange}
          placeholder="مثلاً: مخزن أكتوبر الرئيسي"
          autoFocus
          className="mb-2"
          error={errors?.name}
        />

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          endIcon={<FaSave />}
        >
          {isSubmitting ? "جاري الحفظ..." : "حفظ المخزن"}
        </Button>
      </div>
      {errors.root && <ErrorField children={errors.root} />}
    </div>
  );
}
