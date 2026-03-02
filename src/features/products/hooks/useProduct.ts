import { useState, useEffect, useCallback } from "react";
import { productService, Product } from "../../../services/productServices";
import { inventoryService, Store } from "../../../services/inventoryService";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    products: 0,
    stores: 0,
    transfers: 0
  });

  

  const fetchInitialData = useCallback(async () => {
    try {
      setLoading(true);
      const [productsData, storesData] = await Promise.all([
        productService.getAllProducts(),
        inventoryService.getAllStores()
      ]);
      setProducts(productsData);
      setStores(Array.isArray(storesData) ? storesData : (storesData as any).data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleAddProduct = async (formData: any) => {
    if (!formData.inventories || formData.inventories.length === 0) {
      alert("برجاء إضافة مخزن واحد على الأقل");
      return false;
    }

    try {
      const finalPayload = {
        ...formData,
        buying_price: parseFloat(formData.buying_price),
        selling_price: parseFloat(formData.selling_price),
      };

      const response = await productService.createProduct(finalPayload);
      const newProduct = response.data || response;
      
      setProducts(prev => [newProduct, ...prev]);
      return true;
    } catch (error: any) {
      alert(error.response?.data?.message || "فشل الحفظ");
      return false;
    }
  };

  const handleUpdateProduct = async (id: number, data: any) => {
    try {
      const finalPayload = {
        ...data,
        buying_price: parseFloat(data.buying_price),
        selling_price: parseFloat(data.selling_price),
      };

      await productService.updateProduct(id, finalPayload);
      
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, ...finalPayload, id } : p
      ));
      return true;
    } catch (error) {
      alert("فشل التحديث");
      return false;
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!window.confirm("هل أنت متأكد من الحذف؟")) return;
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      alert("فشل الحذف");
    }
  };

  return { 
    products, 
    stores, 
    loading, 
    handleAddProduct, 
    handleDeleteProduct, 
    handleUpdateProduct ,
    stats: {
      products: products.length,
      stores: stores.length,
      transfers: dashboardStats.transfers
    }
  
}}