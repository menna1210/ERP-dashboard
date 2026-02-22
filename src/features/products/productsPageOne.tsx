import { useState } from "react";
import { FaBox, FaPlus, FaSearch, FaBoxes } from "react-icons/fa";
import { useProducts } from "./hooks/useProduct";
import { Product } from "../../services/productServices";
import ProductTable from "./components/productTable";
import AddProductModal from "./components/AddProductModal";
import EditProductModal from "./components/EditProductModal";

export default function Products() {
  // 1. استخدام الـ Hook اللي جواه كل الـ Logic
  const { 
    products, 
    loading, 
    handleAddProduct, 
    handleUpdateProduct, 
    handleDeleteProduct 
  } = useProducts();

  // 2. حالات التحكم في ظهور المودالز
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  // 3. حالة البحث (Search)
  const [searchTerm, setSearchTerm] = useState("");

  // تصفية المنتجات بناءً على البحث
  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f8fafc]">
        <div className="animate-bounce p-5 bg-blue-600 rounded-full shadow-xl">
            <FaBox className="text-white text-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] min-h-screen" dir="rtl">
      <div className="max-w-7xl mx-auto">
        
        {/* الهيدر (العنوان + زرار الإضافة) */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-4">
              <span className="p-4 bg-blue-600 text-white rounded-[24px] shadow-lg shadow-blue-200">
                <FaBoxes />
              </span>
              إدارة المخزون والمنتجات
            </h1>
            <p className="text-slate-400 mt-2 font-medium mr-16">
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

        {/* بار البحث والإحصائيات السريعة */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 relative">
            <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300" />
            <input 
              type="text" 
              placeholder="ابحث عن منتج بالاسم..."
              className="w-full py-5 pr-14 pl-6 bg-white border-2 border-slate-100 rounded-[22px] outline-none focus:border-blue-500 transition-all font-bold text-slate-600 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-white p-5 border-2 border-slate-100 rounded-[22px] flex items-center justify-between px-8 shadow-sm">
             <span className="text-slate-400 font-bold">إجمالي المنتجات:</span>
             <span className="text-2xl font-black text-blue-600">{products.length}</span>
          </div>
        </div>

        {/* جدول عرض المنتجات */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ProductTable 
            products={filteredProducts} 
            onDelete={handleDeleteProduct} 
            onEdit={(product) => setEditingProduct(product)} 
          />
        </div>

        {/* مودال الإضافة */}
        <AddProductModal 
          isOpen={isAddModalOpen} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdd={handleAddProduct} 
        />

        {/* مودال التعديل */}
        <EditProductModal 
          isOpen={!!editingProduct} 
          product={editingProduct}
          onClose={() => setEditingProduct(null)} 
          onUpdate={handleUpdateProduct} 
        />

      </div>
    </div>
  );
}