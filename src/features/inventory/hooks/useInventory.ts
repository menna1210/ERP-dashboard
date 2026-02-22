import { useState, useEffect } from "react";
import { inventoryService, Store } from "../../../services/inventoryService";

export const useInventory = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const fetchStores = async () => {
    try {
      setLoading(true);
      const data = await inventoryService.getAllStores();
      setStores(data);
    } catch (err) {
      console.error("فشل تحميل البيانات:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleAddStore = async (name: string) => {
    try {
      await inventoryService.createStore(name);
      await fetchStores(); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("حدث خطأ أثناء إضافة المخزن");
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("هل أنت متأكد من الحذف؟")) {
      try {
        await inventoryService.deleteStore(id);
        await fetchStores();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        alert("فشل الحذف");
      }
    }
  };

  const handleUpdate = async (id: number) => {
    try {
      await inventoryService.updateStore(id, editValue);
      setEditId(null);
      await fetchStores();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      alert("فشل التعديل");
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleString("ar-EG", {
      day: "numeric", month: "long", year: "numeric"
    });
  };

  return {
    stores, loading, editId, setEditId, editValue, setEditValue,
    handleAddStore, handleDelete, handleUpdate, formatDate
  };
};