import { useState } from "react";
import { useProducts } from "../products/hooks/useProduct";
import TransferModal from "./components/TransferModel";
import { useStockTransfer } from "./hooks/useStockTransfer";

export default function StockPageOne() {
  const {logs ,stores , isLoading ,createTransfer }= useStockTransfer()
  const { products } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);



  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black text-slate-800">سجل تحويلات المخزون</h1>
        <button 
          onClick={() => setIsModalOpen(true)} 
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-100"
        >
          إجراء تحويل جديد
        </button>
      </div>

      <div className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-slate-100">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-slate-400 font-bold">
            <tr>
              <th className="p-6">المنتج</th>
              <th className="p-6">من</th>
              <th className="p-6 text-center">الحالة</th>
              <th className="p-6">إلى</th>
              <th className="p-6">الكمية</th>
              <th className="p-6">التوقيت</th>
            </tr>
          </thead>
      <tbody className="divide-y divide-slate-100">
  {!isLoading && logs.map((log) => (
    <tr key={log.id} className="hover:bg-slate-50">
      <td className="p-6 font-bold text-slate-700">
        {log.products?.[0]?.name || "منتج غير معروف"}
      </td>
      <td className="p-6">
        <span className="text-red-600 bg-red-50 px-3 py-1 rounded-full text-sm font-bold">
          {log.from_inventory?.name || "المخزن الرئيسي"}
        </span>
      </td>
      <td className="p-6 text-center">
        <div className="flex justify-center items-center gap-2 text-slate-400">
           
        </div>
      </td>
      <td className="p-6">
        <span className="text-green-600 bg-green-50 px-3 py-1 rounded-full text-sm font-bold">
          {log.to_inventory?.name || "مخزن الفرع"}
        </span>
      </td>
      <td className="p-6 font-black text-blue-600">
        {log.products?.[0]?.pivot?.quantity || log.quantity || 0}
      </td>
      <td className="p-6 text-slate-500 text-xs">
        {new Date(log.created_at).toLocaleString('ar-EG')}
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>

      <TransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={products || []}
        allStores={stores}
        onTransfer={createTransfer}
      />
    </div>
  );
}