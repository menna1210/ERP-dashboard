import { useState, useEffect } from "react";
import { inventoryService, Store } from "../../../services/inventoryService";
import { Axios, AxiosError } from "axios";

export const useInventory = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<string>("");

  const fetchStores = async () => {
    try {
      setLoading(true);
      const result = await inventoryService.getAllStores();
      setStores(result || []);
    } catch (err) {
      setError((err as AxiosError<Error>).response?.data.message || "حدث خطأ")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleAddStore = async (name: string) => {
    try {
      const payload = { name };
      const response = await inventoryService.createStore(payload);
      await fetchStores();
    } catch (err) {
      throw Error((err as AxiosError<Error>).response?.data.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("هل أنت متأكد من الحذف؟")) {
      try {
        await inventoryService.deleteStore(id);
        await fetchStores();
      } catch (err) {
        alert("فشل التحديث: " + (err));
      }
    }
  };

  const handleUpdate = async (id: number,editValue:Partial<Store>) => {
    try {
      await inventoryService.updateStore(id, editValue);
      setEditId(null);
      await fetchStores();
    } catch (err: any) {
      alert("فشل التحديث: " + (err?.message || "حدث خطأ غير معروف"));
    }
  };

  return {
    stores, loading, editId, setEditId, editValue, setEditValue,
    fetchStores, handleAddStore, handleDelete, handleUpdate
  };
};