import { useState, useMemo } from "react";
import { FaExchangeAlt, FaTimes, FaSearch, FaBox, FaArrowLeft } from "react-icons/fa";
import Button from "../../../components/ui/button";
export default function TransferModal({ isOpen, onClose, products, allStores, onTransfer }: any) {
  const [productSearch, setProductSearch] = useState("");
  const [fromSearch, setFromSearch] = useState("");
  const [toSearch, setToSearch] = useState("");
  const [quantity, setQuantity] = useState(1);
  
  const [formData, setFormData] = useState({
    from_inventory_id: "",
    to_inventory_id: "",
    product_id: "" 
  });

  const filteredProducts = useMemo(() => {
    if (!productSearch || formData.product_id) return [];
    return products?.filter((p: any) => p.name.toLowerCase().includes(productSearch.toLowerCase())).slice(0, 5);
  }, [products, productSearch, formData.product_id]);

  const filteredFromStores = useMemo(() => {
    if (!fromSearch || formData.from_inventory_id) return [];
    return allStores?.filter((s: any) => s.name.toLowerCase().includes(fromSearch.toLowerCase())).slice(0, 5);
  }, [allStores, fromSearch, formData.from_inventory_id]);

  const filteredToStores = useMemo(() => {
    if (!toSearch || formData.to_inventory_id) return [];
    return allStores?.filter((s: any) => s.name.toLowerCase().includes(toSearch.toLowerCase())).slice(0, 5);
  }, [allStores, toSearch, formData.to_inventory_id]);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (!formData.product_id || !formData.from_inventory_id || !formData.to_inventory_id) {
      alert("يرجى اختيار المنتج والمخازن");
      return;
    }

    if (formData.from_inventory_id === formData.to_inventory_id) {
      alert("لا يمكن التحويل لنفس المخزن");
      return;
    }

    try {
      const finalPayload = {
        from_inventory_id: Number(formData.from_inventory_id),
        to_inventory_id: Number(formData.to_inventory_id),
        products: [
          {
            product_id: Number(formData.product_id),
            quantity: Number(quantity)
          }
        ]
      };

      await onTransfer(finalPayload);
      
      alert("تمت عملية التحويل بنجاح");
      
      setFormData({ from_inventory_id: "", to_inventory_id: "", product_id: "" });
      setProductSearch(""); setFromSearch(""); setToSearch(""); setQuantity(1);
      onClose();
    } catch (err: any) {
      alert(err.message || "فشلت العملية");
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-md flex items-center justify-center z-[999] p-4 font-sans text-right" dir="rtl">
      <div className="bg-white p-8 rounded-[40px] w-full max-w-xl shadow-2xl">
        
        <div className="flex justify-between items-center mb-8 pb-4 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-3 rounded-2xl text-white shadow-lg shadow-blue-200">
              <FaExchangeAlt />
            </div>
            <h2 className="text-2xl font-black text-slate-800">إجراء تحويل مخزني</h2>
          </div>
          <button onClick={onClose} className="hover:rotate-90 transition-transform duration-300">
            <FaTimes className="text-slate-300" size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <label className="block text-sm font-black text-slate-500 mb-2 mr-2">المنتج المراد نقله</label>
            <div className="relative">
              <FaSearch className="absolute right-4 top-4 text-slate-400" />
              <input 
                type="text" placeholder="اكتب اسم المنتج..."
                className="w-full p-4 pr-12 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-blue-500 font-bold outline-none"
                value={productSearch}
                onChange={(e) => { setProductSearch(e.target.value); setFormData({...formData, product_id: ""}); }}
              />
            </div>
            {filteredProducts.length > 0 && (
              <div className="absolute z-30 w-full mt-2 bg-white border rounded-2xl shadow-2xl max-h-48 overflow-auto">
                {filteredProducts.map((p: any) => (
                  <div key={p.id} onClick={() => { setFormData({...formData, product_id: p.id}); setProductSearch(p.name); }}
                       className="p-4 hover:bg-blue-50 cursor-pointer font-bold border-b last:border-0 flex items-center gap-3">
                    <FaBox className="text-slate-300" /> {p.name}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-sm font-bold text-red-500 mb-2 mr-2">من مخزن</label>
              <input 
                type="text" placeholder="بحث..."
                className="w-full p-4 bg-red-50/30 rounded-2xl border-2 border-transparent focus:border-red-400 font-bold outline-none"
                value={fromSearch}
                onChange={(e) => { setFromSearch(e.target.value); setFormData({...formData, from_inventory_id: ""}); }}
              />
              {filteredFromStores.length > 0 && (
                <div className="absolute z-20 w-full mt-2 bg-white border rounded-2xl shadow-xl max-h-40 overflow-auto">
                  {filteredFromStores.map((s: any) => (
                    <div key={s.id} onClick={() => { setFormData({...formData, from_inventory_id: s.id}); setFromSearch(s.name); }}
                         className="p-3 hover:bg-red-50 cursor-pointer font-bold border-b last:border-0">
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-bold text-green-500 mb-2 mr-2">إلى مخزن</label>
              <input 
                type="text" placeholder="بحث..."
                className="w-full p-4 bg-green-50/30 rounded-2xl border-2 border-transparent focus:border-green-400 font-bold outline-none"
                value={toSearch}
                onChange={(e) => { setToSearch(e.target.value); setFormData({...formData, to_inventory_id: ""}); }}
              />
              {filteredToStores.length > 0 && (
                <div className="absolute z-20 w-full mt-2 bg-white border rounded-2xl shadow-xl max-h-40 overflow-auto">
                  {filteredToStores.map((s: any) => (
                    <div key={s.id} onClick={() => { setFormData({...formData, to_inventory_id: s.id}); setToSearch(s.name); }}
                         className="p-3 hover:bg-green-50 cursor-pointer font-bold border-b last:border-0">
                      {s.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-50 p-6 rounded-[30px] border-2 border-dashed">
            <label className="block text-center font-black text-slate-600 mb-4 text-lg">الكمية المراد تحويلها</label>
            <div className="flex items-center justify-center gap-4">
               <button type="button" onClick={() => setQuantity(q => q + 1)} className="w-12 h-12 bg-white rounded-xl shadow-sm border flex items-center justify-center text-blue-600 font-bold">+</button>
               <input 
                type="number" min="1"
                className="w-32 bg-transparent text-center text-4xl font-black text-blue-600 outline-none"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))} 
               />
               <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-12 h-12 bg-white rounded-xl shadow-sm border flex items-center justify-center text-red-600 font-bold">-</button>
            </div>
          </div>

          <Button
            onClick={handleConfirm} >
            إتمام عملية النقل 
          </Button>
        </div>
      </div>
    </div>
  );
}