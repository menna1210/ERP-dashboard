import { FaEdit, FaTrash, FaWarehouse } from "react-icons/fa";
import { Product } from "../../../services/productServices";

interface Props {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

export default function ProductTable({ products, onDelete, onEdit }: Props) {
  return (
    <div className="bg-white rounded-[30px] shadow-sm border overflow-hidden">
      <table className="w-full text-right">
        <thead className="bg-slate-50 text-slate-400 font-bold">
          <tr>
            <th className="p-6">المنتج</th>
            <th className="p-6">الأسعار</th>
            <th className="p-6">توزيع المخزون</th>
            <th className="p-6 text-center">الإجراءات</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-blue-50/20 transition-colors font-bold">
              <td className="p-6">
                <div className="text-slate-800 text-lg">{product.name}</div>
                <div className="text-slate-400 text-xs">{product.description}</div>
              </td>
              <td className="p-6">
                <div className="text-green-600 text-sm">شراء: {product.buying_price}</div>
                <div className="text-blue-600 text-sm">بيع: {product.selling_price}</div>
              </td>
              <td className="p-6">
                <div className="flex flex-wrap gap-2">
                  {product.inventories?.map((inv: any) => (
                    <span key={inv.id} className="bg-slate-100 px-3 py-1 rounded-full text-[10px] flex items-center gap-1">
                      <FaWarehouse size={8}/> {inv.name}: {inv.pivot?.quantity || inv.quantity}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-6">
                <div className="flex justify-center gap-2">
                  <button onClick={() => onEdit(product)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"><FaEdit /></button>
                  <button onClick={() => onDelete(product.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all"><FaTrash /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}