import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { Store } from "../../../services/inventoryService";

interface Props {
  stores: Store[];
  currentPage: number;
  lastPage: number;
  onPageChange: (page: number) => void;
  editId: number | null;
  editValue: string;
  setEditId: (id: number | null) => void;
  setEditValue: (val: string) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number) => void;
}

export default function StoreTable({ 
  stores,  
  editId, editValue, setEditId, setEditValue, onDelete, onUpdate 
}: Props) {
  
  return (
    <div className="space-y-6 font-sans" dir="rtl">
      <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-right">
          <thead className="bg-slate-50 border-b">
            <tr className="text-slate-400">
              <th className="px-10 py-5 text-sm font-black">المخزن</th>
              <th className="px-10 py-5 text-sm font-black text-center">التحكم</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {stores.map((store) => (
              <tr key={store.id} className="hover:bg-blue-50/20 transition-colors group">
                <td className="px-10 py-6">
                  {editId === store.id ? (
                    <input 
                      className="p-2 border-2 border-blue-500 rounded-xl outline-none" 
                      value={editValue} 
                      onChange={e => setEditValue(e.target.value)} 
                    />
                  ) : (
                    <span className="font-bold text-slate-700 text-lg">{store.name}</span>
                  )}
                </td>
                <td className="px-10 py-6 flex justify-center gap-3">
                  {editId === store.id ? (
                    <>
                      <button onClick={() => onUpdate(store.id)} className="text-green-500"><FaCheck /></button>
                      <button onClick={() => setEditId(null)} className="text-slate-400"><FaTimes /></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => {setEditId(store.id); setEditValue(store.name);}} className="p-3 text-blue-500 bg-blue-50 rounded-xl"><FaEdit /></button>
                      <button onClick={() => onDelete(store.id)} className="p-3 text-red-500 bg-red-50 rounded-xl"><FaTrash /></button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
    </div>
  );
}