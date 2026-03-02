import { useState, useEffect, useCallback } from "react";
import { transferService, TransferDTO } from "../../../services/stockServices";
import { inventoryService } from "../../../services/inventoryService";

export const useStockTransfer = () => {
  const [logs, setLogs] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [logsData, storesData] = await Promise.all([
        transferService.getTransferLogs(),
        inventoryService.getAllStores(),
      ]);

      setLogs(logsData.data || logsData || []); 
      setStores(storesData.data || storesData || []); 
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createTransfer = async (data: TransferDTO) => {
    try {
      await transferService.createTransfer(data);
      await fetchData(); 
      return true; 
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "فشلت عملية التحويل");
    }
  };

  return { logs, stores, isLoading, createTransfer }; 
};