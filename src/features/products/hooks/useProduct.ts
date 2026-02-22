import { useState, useEffect } from "react";
import { productService, Product } from "../../../services/productServices";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المنتج؟")) {
      try {
        await productService.deleteProduct(id);
        await fetchProducts(); 
      } catch (err) {
        console.error("Delete error:", err);
        alert("فشل حذف المنتج");
      }
    }
  };

  return { 
    products, 
    loading, 
    fetchProducts, 
    handleDeleteProduct 
  };
};