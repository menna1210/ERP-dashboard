import { useState } from "react";
import { Store } from "../../services/inventoryService";
import { FaPlus, FaTrash, FaEdit, FaWarehouse } from "react-icons/fa";
import { useInventory } from "./hooks/useInventory";
import { formatDate } from "../../utils/formatDate";
import AddStore from "./components/AddStore";

export default function InventoryPage() {
  const { stores, loading, handleDelete } = useInventory();

  const [updatedData, setUpdatedData] = useState<Store>();

  const [openModel, setOpenModel] = useState(false);

  const openAddModal = () => {
    setOpenModel(true);
  };

  const closeModel = () => {
    setUpdatedData(undefined);
    setOpenModel(false);
  };

  const openEditModal = (store: Store) => {
    setUpdatedData(store);
  };

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen" dir="rtl">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <FaWarehouse className="text-blue-600" /> إدارة المخازن
          </h1>
          <p className="text-slate-500 mt-2">
            تحكم في جميع مستودعاتك من مكان واحد
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
        >
          <FaPlus /> إضافة مخزن جديد
        </button>
      </div>

      <div className="bg-white rounded-[30px] overflow-hidden shadow-sm border border-slate-100">
        <table className="w-full text-right">
          <thead className="bg-slate-50 text-slate-400 font-bold border-b border-slate-50">
            <tr>
              <th className="p-6">اسم المخزن</th>
              <th className="p-6">تاريخ الإنشاء</th>
              <th className="p-6 text-center">الإجراءات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-20 text-center text-slate-400 font-bold"
                >
                  جاري تحميل البيانات...
                </td>
              </tr>
            ) : stores.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-20 text-center text-slate-400">
                  لا توجد مخازن حالياً
                </td>
              </tr>
            ) : (
              [...stores].reverse().map((store) => (
                <tr
                  key={store.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  <td className="p-6">
                    <div className="font-bold text-slate-700">{store.name}</div>
                  </td>
                  <td className="p-6 text-slate-400 text-sm">
                    {store.created_at ? formatDate(store.created_at) : "---"}
                  </td>
                  <td className="p-6">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => openEditModal(store)}
                        className="p-3 text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(store.id)}
                        className="p-3 text-red-600 bg-red-50 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <AddStore isOpen={openModel || !!updatedData} onClose={closeModel} updatedData={updatedData} />
    </div>
  );
}
