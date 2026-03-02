import { axiosConfig, APIs } from "../utils/axiosConfig";

export interface ProductInventory {
  id: number;
  quantity: number;
  name?: string;
  pivot?: { quantity: number };
}

export interface Product {
  id: number;
  name: string;
  description: string;
  buying_price: number;
  selling_price: number;
  inventories: ProductInventory[];
}

export interface CreateProductDTO {
  name: string;
  description: string;
  buying_price: number;
  selling_price: number;
  inventories: { inventory_id: number; quantity: number }[];
}

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    const response = await axiosConfig.get(APIs.products);
    return Array.isArray(response.data)
      ? response.data
      : response.data.data || [];
  },

  createProduct: async (data: CreateProductDTO): Promise<Product> => {
    try {
      const payload = {
        name: data.name,
        description:
          data.description.trim() === "" ? "وصف افتراضي" : data.description,
        buying_price: Number(data.buying_price),
        selling_price: Number(data.selling_price),
        inventories: data.inventories.map((inv) => ({
          inventory_id: Number(inv.inventory_id),
          quantity: Number(inv.quantity),
        })),
      };

      const response = await axiosConfig.post(APIs.products, payload, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      return response.data;
    } catch (error: any) {
      console.error("Axios Detailed Error:", error);
      console.error("Response Data:", error.response?.data);
      throw error;
    }
  },

  updateProduct: async (
    id: number,
    data: CreateProductDTO
  ): Promise<Product> => {
    const payload = {
      name: data.name,
      description: data.description || " ",
      buying_price: Number(data.buying_price) || 0,
      selling_price: Number(data.selling_price) || 0,
      inventories: data.inventories.map((inv) => ({
        inventory_id: Number(inv.inventory_id),
        quantity: Number(inv.quantity),
      })),
    };
    const response = await axiosConfig.put(`${APIs.products}/${id}`, payload);
    return response.data;
  },

  deleteProduct: async (id: number): Promise<void> => {
    await axiosConfig.delete(`${APIs.products}/${id}`);
  },
};

