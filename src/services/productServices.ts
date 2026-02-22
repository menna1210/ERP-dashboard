import { axiosConfig, APIs } from "../utils/axiosConfig";

export interface ProductInventory {
  id: number;
  name: string;
  quantity: string; 
}

export interface Product {
  id: number;
  name: string;
  description: string;
  buying_price: string;
  selling_price: string;
  created_at: string;
  updated_at: string;
  inventories: ProductInventory[]; 
}

export interface CreateProductDTO {
  name: string;
  description: string;
  buying_price: number;
  selling_price: number;
  inventories: {
    id: number;      
    quantity: number; 
  }[];
}

export const productService = {
  getAllProducts: async () => {
    const response = await axiosConfig.get(APIs.products);
    return response.data.data as Product[];
  },

  createProduct: async (productData: CreateProductDTO) => {
    const response = await axiosConfig.post(APIs.products, productData);
    return response.data;
  },

  deleteProduct: async (id: number) => {
    const response = await axiosConfig.delete(`${APIs.products}/${id}`);
    return response.data;
  }
};