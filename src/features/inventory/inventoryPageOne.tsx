import { useState } from "react";
import { FaWarehouse, FaPlus } from "react-icons/fa";
import { useInventory } from "./hooks/useInventory";
import StoreTable from "./components/StoreTable";
import AddStore from "./components/AddStore";

export default function Inventory() {
  const {
    stores, loading, editId, setEditId, editValue, setEditValue,
    handleAddStore, handleDelete, handleUpdate, formatDate
  } = useInventory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen text-right" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-slate-800 flex items-center gap-4">
            <span className="p-3 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-100">
              <FaWarehouse size={24} />
            </span>
            إدارة المخازن
          </h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
          >
            <FaPlus /> إضافة مخزن
          </button>
        </div>

        <StoreTable 
          stores={stores}
          editId={editId}
          editValue={editValue}
          setEditId={setEditId}
          setEditValue={setEditValue}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
          formatDate={formatDate}
        />

        <AddStore
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onAdd={handleAddStore} 
        />

      </div>
    </div>
  );
}