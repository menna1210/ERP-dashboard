import { useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
}

export default function AddStore({ isOpen, onClose, onAdd }: Props) {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (name.trim()) {
      onAdd(name); // بيبعت الاسم للهوك
      setName("");  // بيمسح اللي كتبته عشان المرة الجاية
      onClose();   // بيقفل الـ Modal
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[30px] p-8 w-full max-w-md shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black text-slate-800">إضافة مخزن</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors">
            <FaTimes size={24} />
          </button>
        </div>
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="اسم المخزن الجديد..."
          className="w-full p-4 border-2 border-slate-100 rounded-2xl mb-6 outline-none focus:border-blue-500 text-lg font-semibold"
          autoFocus
        />
        
        <div className="flex gap-3">
          <button onClick={handleSubmit} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            <FaSave /> حفظ
          </button>
          <button onClick={onClose} className="flex-1 bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all">
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}