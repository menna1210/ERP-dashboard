import { axiosConfig, APIs } from "../utils/axiosConfig";

export interface Store {
  id: number;
  name: string;
  created_at: string;
}

export const inventoryService = {
  getAllStores: async () => {
    const response = await axiosConfig.get(APIs.inventories);
    return response.data.data as Store[]; 
  },

  createStore: async (name: string) => {
    const response = await axiosConfig.post(APIs.inventories, { name });
    return response.data;
  },

  updateStore: async (id: number, name: string) => {
    const response = await axiosConfig.put(`${APIs.inventories}/${id}`, { name });
    return response.data;
  },

  deleteStore: async (id: number) => {
    const response = await axiosConfig.delete(`${APIs.inventories}/${id}`);
    return response.data;
  }
};