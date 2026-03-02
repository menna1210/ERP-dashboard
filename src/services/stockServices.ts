import { axiosConfig, APIs } from "../utils/axiosConfig";

export interface TransferDTO {
  from_inventory_id: number;
  to_inventory_id: number;
  product_id: number;
  quantity: number;
  notes?: string;
}

export const transferService = {
  getTransferLogs: async () => {
    const response = await axiosConfig.get(APIs.transfers); 
    return response.data;
  },

  createTransfer: async (data: TransferDTO) => {
    const response = await axiosConfig.post(APIs.transfers, data);
    return response.data;
  }
};