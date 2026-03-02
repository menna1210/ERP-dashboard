import { useState } from "react";
import { FaBox, FaPlus, FaSearch, FaBoxes } from "react-icons/fa";
import { useProducts } from "./hooks/useProduct";
import ProductTable from "./components/productTable";
import { Product } from "../../services/productServices";
import ProductFormModel from "./components/ProductFormModel";

export default function Products() {
  const {
    products,
    loading,
    stores,
    handleAddProduct,
    handleDeleteProduct,
    handleUpdateProduct,
  } = useProducts();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
const handleCloseModal = () => {
  setIsAddModalOpen(false);
  setEditingProduct(null); 
};

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-bounce p-5 bg-blue-600 rounded-full shadow-xl shadow-blue-200">
            <FaBox className="text-white text-3xl" />
          </div>
          <p className="font-black text-slate-600 animate-pulse text-lg">
            جاري تحميل المنتجات...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-4">
              <span className="p-4 bg-blue-600 text-white rounded-[24px] shadow-lg shadow-blue-200">
                <FaBoxes />
              </span>
              إدارة المخزون والمنتجات
            </h1>
            <p className="text-slate-400 mt-2 font-medium mr-1 md:mr-16">
              تابع منتجاتك، كمياتها، وتوزيعها في المخازن المختلفة.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-[22px] font-black flex items-center gap-3 transition-all shadow-xl shadow-blue-100 active:scale-95 text-lg w-full md:w-auto justify-center"
          >
            <FaPlus /> إضافة منتج جديد
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
            <input
              type="text"
              placeholder="ابحث عن منتج بالاسم..."
              className="w-full py-5 pr-14 pl-6 bg-white border-2 border-slate-50 rounded-[22px] outline-none focus:border-blue-500 transition-all font-bold text-slate-600 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-white p-5 border-2 border-slate-50 rounded-[22px] flex items-center justify-between px-8 shadow-sm">
            <span className="text-slate-400 font-bold">إجمالي الأنواع:</span>
            <span className="text-2xl font-black text-blue-600">
              {products.length}
            </span>
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ProductTable
            products={filteredProducts}
            onDelete={handleDeleteProduct}
            onEdit={(product) => setEditingProduct(product)}
          />
        </div>

        {(isAddModalOpen || editingProduct) && (
          <ProductFormModel
            isOpen={isAddModalOpen}
            onClose={() => handleCloseModal()}
            allStores={stores}
            initialData={editingProduct}
         onAdd={async (data) => {
      const success = editingProduct 
        ? await handleUpdateProduct(editingProduct.id, data) 
        : await handleAddProduct(data);
      if (success) handleCloseModal();
      return !!success;
    }}
          />
        )}
      </div>
      
    </div>
   
  );
}
