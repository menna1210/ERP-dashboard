import { useState, useEffect } from "react";
import { FaTimes, FaPlus, FaTrash} from "react-icons/fa";
import { inventoryService, Store } from "../../../services/inventoryService";
import { Product, CreateProductDTO } from "../../../services/productServices";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: number, product: CreateProductDTO) => void;
  product: Product | null;
}

export default function EditProductModal({ isOpen, onClose, onUpdate, product }: Props) {
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
    if (!isOpen || !product) return;

    // جلب المخازن وتحديث الـ State بهدوء
    inventoryService.getAllStores().then(setAllStores);

    // تحديث البيانات مرة واحدة لتجنب الـ cascading renders
    setFormData({
      name: product.name,
      description: product.description,
      buying_price: Number(product.buying_price) || 0,
      selling_price: Number(product.selling_price) || 0,
    });

    const mappedInvs = product.inventories.map(inv => ({
      id: inv.id,
      name: inv.name,
      quantity: Number(inv.quantity) || 0
    }));
    setSelectedInvs(mappedInvs);

  }, [isOpen, product?.id]); // نراقب الـ ID فقط

  const addStoreToProduct = () => {
    if (currentStoreId === "" || currentQty <= 0) return;
    const store = allStores.find(s => s.id === currentStoreId);
    if (!store || selectedInvs.find(i => i.id === store.id)) return;
    setSelectedInvs([...selectedInvs, { id: store.id, name: store.name, quantity: currentQty }]);
    setCurrentStoreId("");
    setCurrentQty(0);
  };

  const handleUpdate = () => {
    if (!product) return;
    const data: CreateProductDTO = {
      ...formData,
      inventories: selectedInvs.map(inv => ({ id: inv.id, quantity: inv.quantity })),
    };
    onUpdate(product.id, data);
    onClose();
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" dir="rtl">
      <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-8">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-2xl font-black text-slate-800 text-center flex-1">تعديل المنتج</h2>
          <button onClick={onClose} className="text-slate-300 hover:text-red-500 transition-colors"><FaTimes size={24} /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <input type="text" value={formData.name} className="w-full p-4 border-2 border-slate-100 rounded-2xl outline-none focus:border-blue-500 font-bold"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            
            <div className="flex gap-2">
              <input type="number" value={formData.buying_price} className="w-1/2 p-4 border-2 border-slate-100 rounded-2xl outline-none"
                onChange={(e) => setFormData({ ...formData, buying_price: Number(e.target.value) })} />
              <input type="number" value={formData.selling_price} className="w-1/2 p-4 border-2 border-slate-100 rounded-2xl outline-none"
                onChange={(e) => setFormData({ ...formData, selling_price: Number(e.target.value) })} />
            </div>
            
            <textarea value={formData.description} className="w-full p-4 border-2 border-slate-100 rounded-2xl h-24 outline-none"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
          </div>

          <div className="bg-blue-50/50 p-6 rounded-[24px] border border-blue-100">
            <h3 className="font-bold text-slate-600 mb-4 text-sm underline">توزيع المخازن</h3>
            <div className="flex flex-col gap-2 mb-4">
              <select value={currentStoreId} onChange={(e) => setCurrentStoreId(Number(e.target.value))} className="w-full p-3 border-2 border-white rounded-xl font-bold">
                <option value="">إضافة مخزن...</option>
                {allStores.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
              <div className="flex gap-2">
                <input type="number" value={currentQty} onChange={(e) => setCurrentQty(Number(e.target.value))} className="w-full p-3 border-2 border-white rounded-xl outline-none" />
                <button onClick={addStoreToProduct} className="bg-emerald-500 text-white px-4 rounded-xl hover:bg-emerald-600"><FaPlus /></button>
              </div>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {selectedInvs.map(inv => (
                <div key={inv.id} className="bg-white p-3 rounded-xl border border-blue-100 flex justify-between items-center text-xs font-bold shadow-sm">
                  <span>{inv.name} ({inv.quantity})</span>
                  <button onClick={() => setSelectedInvs(selectedInvs.filter(i => i.id !== inv.id))} className="text-red-400 hover:text-red-600"><FaTrash size={12}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={handleUpdate} className="flex-1 bg-blue-600 text-white py-5 rounded-[22px] font-black text-xl hover:bg-blue-700 shadow-xl transition-all">تحديث</button>
          <button onClick={onClose} className="px-8 bg-slate-100 text-slate-500 py-5 rounded-[22px] font-bold hover:bg-slate-200 transition-all">إلغاء</button>
        </div>
      </div>
    </div>
  );
}