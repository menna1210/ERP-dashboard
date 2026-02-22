import { FaTrash, FaEdit, FaBoxOpen, FaMapMarkerAlt, FaShoppingBag, FaTag } from "react-icons/fa";
import { Product } from "../../../services/productServices";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

export default function ProductTable({ products, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden" dir="rtl">
      <table className="w-full text-right">
        <thead className="bg-slate-50/50 border-b border-slate-100 font-bold text-slate-400">
          <tr>
            <th className="px-6 py-5">المنتج</th>
            <th className="px-6 py-5">الأسعار</th>
            <th className="px-6 py-5">المخازن</th>
            <th className="px-6 py-5 text-center">التحكم</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-blue-50/20 transition-all group">
              <td className="px-6 py-6 font-bold text-slate-700">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FaBoxOpen size={20} /></div>
                  {product.name}
                </div>
              </td>
              <td className="px-6 py-6 font-black text-xs">
                <div className="text-emerald-600 mb-1 flex items-center gap-1"><FaShoppingBag size={10} /> شراء: {product.buying_price}</div>
                <div className="text-blue-600 flex items-center gap-1"><FaTag size={10} /> بيع: {product.selling_price}</div>
              </td>
              <td className="px-6 py-6">
                <div className="flex flex-wrap gap-1">
                  {product.inventories.map(inv => (
                    <span key={inv.id} className="inline-flex items-center gap-1 px-2 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600 border border-slate-200">
                      <FaMapMarkerAlt className="text-blue-400" size={8} /> {inv.name}: {inv.quantity}
                    </span>
                  ))}
                </div>
              </td>
              <td className="px-6 py-6">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(product)} className="p-2 text-blue-500 bg-blue-50 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><FaEdit /></button>
                  <button onClick={() => onDelete(product.id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-600 hover:text-white transition-all"><FaTrash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}