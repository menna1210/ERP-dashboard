import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaTrash, FaSave } from "react-icons/fa";
import { inventoryService, Store } from "../../../services/inventoryService";
import { CreateProductDTO } from "../../../services/productServices";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (product: CreateProductDTO) => void;
}

export default function AddProductModal({ isOpen, onClose, onAdd }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    buying_price: 0,
    selling_price: 0,
  });

  const [allStores, setAllStores] = useState<Store[]>([]);
  const [selectedInvs, setSelectedInvs] = useState<{ id: number; name: string; quantity: number }[]>([]);
  const [currentStoreId, setCurrentStoreId] = useState<number | "">("");
  const [currentQty, setCurrentQty] = useState<number>(0);

  useEffect(() => {
    if (isOpen) {
      inventoryService.getAllStores().then(setAllStores);
    }
  }, [isOpen]);

  const addStoreToProduct = () => {
    if (currentStoreId === "" || currentQty <= 0) return;
    const store = allStores.find((s) => s.id === currentStoreId);
    if (!store || selectedInvs.find((i) => i.id === store.id)) return;

    setSelectedInvs([...selectedInvs, { id: store.id, name: store.name, quantity: currentQty }]);
    setCurrentStoreId("");
    setCurrentQty(0);
  };

  const handleSubmit = () => {
    if (!formData.name || selectedInvs.length === 0) {
      alert("يرجى إدخال اسم المنتج وإضافة مخزن واحد على الأقل");
      return;
    }
    const data: CreateProductDTO = {
      ...formData,
      inventories: selectedInvs.map((inv) => ({ id: inv.id, quantity: inv.quantity })),
    };
    onAdd(data);
    onClose();
    setFormData({ name: "", description: "", buying_price: 0, selling_price: 0 });
    setSelectedInvs([]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8 animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-black text-slate-800">إضافة منتج جديد</h2>
          <button onClick={onClose} className="text-slate-300 hover:text-red-500 transition-colors"><FaTimes size={24} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <input type="text" placeholder="اسم المنتج" className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500" 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <textarea placeholder="وصف المنتج" className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 h-24"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <div className="flex gap-2">
              <input type="number" placeholder="سعر الشراء" className="w-1/2 p-4 border-2 border-slate-100 rounded-2xl outline-none"
                onChange={(e) => setFormData({ ...formData, buying_price: Number(e.target.value) })} />
              <input type="number" placeholder="سعر البيع" className="w-1/2 p-4 border-2 border-slate-100 rounded-2xl outline-none"
                onChange={(e) => setFormData({ ...formData, selling_price: Number(e.target.value) })} />
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-[24px] border border-slate-100">
            <h3 className="font-bold text-slate-600 mb-4">التوزيع في المخازن</h3>
            <div className="flex flex-col gap-3 mb-4">
              <select value={currentStoreId} onChange={(e) => setCurrentStoreId(Number(e.target.value))} className="w-full p-3 border-2 border-white rounded-xl shadow-sm outline-none">
                <option value="">اختر المخزن...</option>
                {allStores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <div className="flex gap-2">
                <input type="number" value={currentQty} onChange={(e) => setCurrentQty(Number(e.target.value))} placeholder="الكمية" className="w-full p-3 border-2 border-white rounded-xl outline-none" />
                <button onClick={addStoreToProduct} className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition-all"><FaPlus /></button>
              </div>
            </div>
            <div className="space-y-2">
              {selectedInvs.map(inv => (
                <div key={inv.id} className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center text-sm font-bold">
                  <span>{inv.name} ({inv.quantity})</span>
                  <button onClick={() => setSelectedInvs(selectedInvs.filter(i => i.id !== inv.id))} className="text-red-400 hover:text-red-600"><FaTrash size={12}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-5 rounded-[22px] font-black text-xl flex items-center justify-center gap-3 hover:bg-blue-700 shadow-xl transition-all">
          <FaSave /> حفظ المنتج
        </button>
      </div>
    </div>
  );
}