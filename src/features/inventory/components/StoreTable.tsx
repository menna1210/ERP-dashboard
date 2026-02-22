import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { Store } from "../../../services/inventoryService";

interface Props {
  stores: Store[];
  editId: number | null;
  editValue: string;
  setEditId: (id: number | null) => void;
  setEditValue: (val: string) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
  formatDate: (date: string) => string;
}

export default function StoreTable({ stores, editId, editValue, setEditId, setEditValue, onDelete, onUpdate, formatDate }: Props) {
  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
      <table className="w-full border-collapse">
        <thead className="bg-slate-50/50 border-b border-slate-100">
          <tr className="text-slate-400">
            <th className="px-10 py-6 text-sm font-black text-right">المخزن</th>
            <th className="px-10 py-6 text-sm font-black text-right">تاريخ الإضافة</th>
            <th className="px-10 py-6 text-sm font-black text-center">التحكم</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {stores.map((store) => (
            <tr key={store.id} className="hover:bg-blue-50/30 transition-colors group">
              <td className="px-10 py-7">
                {editId === store.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="w-full p-3 border-2 border-blue-500 rounded-2xl outline-none font-bold text-blue-600 bg-white"
                    autoFocus
                  />
                ) : (
                  <span className="font-bold text-slate-700 text-xl group-hover:text-blue-600 transition-colors">
                    {store.name}
                  </span>
                )}
              </td>
              <td className="px-10 py-7">
                <span className="text-slate-400 font-bold text-sm bg-slate-50 px-4 py-2 rounded-xl">
                  {formatDate(store.created_at)}
                </span>
              </td>
              <td className="px-10 py-7">
                <div className="flex items-center justify-center gap-4">
                  {editId === store.id ? (
                    <>
                      <button onClick={() => onUpdate(store.id)} className="w-12 h-12 flex items-center justify-center bg-green-100 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all"><FaCheck /></button>
                      <button onClick={() => setEditId(null)} className="w-12 h-12 flex items-center justify-center bg-slate-100 text-slate-400 rounded-2xl hover:bg-slate-800 hover:text-white transition-all"><FaTimes /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(store.id); setEditValue(store.name); }} className="w-12 h-12 flex items-center justify-center text-blue-500 bg-blue-50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"><FaEdit size={20} /></button>
                      <button onClick={() => onDelete(store.id)} className="w-12 h-12 flex items-center justify-center text-red-500 bg-red-50 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><FaTrash size={18} /></button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}