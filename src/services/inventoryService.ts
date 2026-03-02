import { APIs, axiosConfig } from "../utils/axiosConfig";

export interface Store {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export const inventoryService = {
  getAllStores: async (): Promise<Store[]> => {
    const response = await axiosConfig.get(APIs.inventories);
    const stores = response.data?.data || response.data;
    return Array.isArray(stores) ? stores : [];
  },

  createStore: async (payload: { name: string }): Promise<any> => {
    const response = await axiosConfig.post(APIs.inventories, payload);
    return response.data;
  },

  updateStore: async (id: number, data: Partial<Store>): Promise<any> => {
    const response = await axiosConfig.put(`${APIs.inventories}/${id}`,data);
    return response.data;
  },

  deleteStore: async (id: number): Promise<void> => {
    await axiosConfig.delete(`${APIs.inventories}/${id}`);
  }
};