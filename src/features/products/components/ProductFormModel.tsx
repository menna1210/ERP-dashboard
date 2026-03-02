import { useState, FormEvent, useEffect } from "react";
import { FaTrash, FaWarehouse } from "react-icons/fa";
import { Store } from "../../../services/inventoryService";
import Button from "../../../components/ui/button";
import Modal from "../../../components/shared/Modal/Modal";
import ModalHeader from "../../../components/shared/Modal/ModalHeader";
import ModalContent from "../../../components/shared/Modal/ModalContent";
import ModalActions from "../../../components/shared/Modal/ModalActions";
import AutoComplete from "../../../components/shared/Autocomplete";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: any) => Promise<boolean>;
  allStores: Store[];
  initialData?: any; 
}

export default function ProductFormModel({ isOpen, onClose, onAdd, allStores = [], initialData }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    buying_price: "",
    selling_price: "",
    inventories: [] as { inventory_id: number; quantity: number }[],
  });

  const [selectedStoresObjects, setSelectedStoresObjects] = useState<Store[]>([]);

 useEffect(() => {
  if ( initialData) {
    setFormData({
      name: initialData.name || "",
      description: initialData.description || "",
      buying_price: initialData.buying_price?.toString() || "",
      selling_price: initialData.selling_price?.toString() || "",
      inventories: initialData.inventories?.map((inv: any) => ({
        inventory_id: inv.id || inv.inventory_id,
        quantity: inv.pivot?.quantity || inv.quantity || 0
      })) || [],
    });

    setSelectedStoresObjects(initialData.inventories || []);
  } else if (isOpen && !initialData) {
    setFormData({ name: "", description: "", buying_price: "", selling_price: "", inventories: [] });
    setSelectedStoresObjects([]);
  }
}, [initialData]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose(); 
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

 const handleStoresChange = (selected: Store[]) => {
    setSelectedStoresObjects(selected);
    setFormData(prev => ({
      ...prev,
      inventories: selected.map(store => {
        const existing = prev.inventories.find(i => i.inventory_id === store.id);
        return { inventory_id: store.id, quantity: existing?.quantity || 0 };
      })
    }));
  };

  const updateQuantity = (id: number, qty: string) => {
    const numQty = parseFloat(qty) || 0;
    setFormData(prev => ({
      ...prev,
      inventories: prev.inventories.map(i => 
        i.inventory_id === id ? { ...i, quantity: numQty } : i
      )
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.inventories.length === 0) return alert("الرجاء اختيار مخزن واحد على الأقل");
    
    setIsSubmitting(true);
    const success = await onAdd(formData);
    if (success) onClose();
    setIsSubmitting(false);
  };
 return (
    <Modal open={isOpen} onClose={onClose}>
      <ModalHeader 
        title={initialData ? "تعديل بيانات المنتج" : "إضافة منتج جديد"} 
        onClose={onClose} 
      />
      <ModalContent className="overflow-visible">
        <div onClick={(e) => e.stopPropagation()}>
          <form id="product-form" onSubmit={handleSubmit} className="p-4 space-y-6">
            <div className="space-y-3">
              <label className="font-bold text-slate-600 block mr-2">اسم المنتج</label>
              <input
                required
                className="w-full p-4 bg-slate-50 border-2 rounded-2xl font-bold focus:border-blue-500 outline-none"
              value={formData.name} 
  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="font-bold text-green-600 block mr-2">سعر الشراء</label>
                <input
                  type="number" step="any" required placeholder="10.00"
                  className="w-full p-4 bg-slate-50 border-2 rounded-2xl font-bold text-green-600 outline-none"
                 value={formData.buying_price}
  onChange={(e) => setFormData({ ...formData, buying_price: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-blue-600 block mr-2">سعر البيع</label>
                <input
                  type="number" step="any" required placeholder="10.00"
                  className="w-full p-4 bg-slate-50 border-2 rounded-2xl font-bold text-blue-600 outline-none"
                  value={formData.selling_price}
  onChange={(e) => setFormData({ ...formData, selling_price: e.target.value })}
                />
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-[2rem] border-2 border-dashed border-slate-200 space-y-4">
              <label className="font-black text-slate-700 block text-lg mb-2">توزيع المخزون</label>
              <AutoComplete<Store>
                options={allStores}
                value={selectedStoresObjects} 
                onChange={handleStoresChange}
                getOptionLabel={(option) => option.name}
                getOptionValue={(option) => option.id}
                placeholder="ابحث عن المخازن..."
              />

              <div className="grid gap-3 mt-4">
                {formData.inventories.map((item) => {
                  const store = allStores.find((s) => s.id === item.inventory_id);
                  return (
                    <div key={item.inventory_id} className="flex justify-between items-center bg-white p-4 rounded-2xl border-2 border-blue-50 shadow-sm">
                      <div className="flex items-center gap-3">
                        <FaWarehouse className="text-blue-600" />
                        <span className="font-bold text-slate-700">{store?.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="number"
                          value={item.quantity || ""}
                          onChange={(e) => updateQuantity(item.inventory_id, e.target.value)}
                          className="w-20 p-2 bg-slate-50 rounded-xl text-center font-black text-blue-600 outline-none border border-slate-200"
                        />
                        <button
                          type="button"
                          onClick={() => handleStoresChange(selectedStoresObjects.filter(s => s.id !== item.inventory_id))}
                          className="p-2 text-red-400 hover:text-red-600"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </form>
        </div>
      </ModalContent>
      <ModalActions>
        <Button form="product-form" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ..." : initialData ? "تحديث المنتج" : "حفظ المنتج"}
        </Button>
      </ModalActions>
    </Modal>
  );
}