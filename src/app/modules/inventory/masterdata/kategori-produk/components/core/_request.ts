
import axiosInstance from "../../../../../../../service/axiosInstance";
import { GetParams } from "../../../../../../types/searchParams";

interface CreateCategoryProductData {
  name: string;
  desc?: string;
  product_type_id: number;
}



export const getProductType = async () => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/product-type`);
    console.log("API Response:", response.data.data);  // Log the response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product type:", error);
    throw error;
  }
};


export const getCategoryProduct = async (
  search: string = "",
  page?: number,
  size?: number,
  product_type_id?: number,
  created_at?: string
) => {
  try {
    const params: any = {
      page,
      size,
      created_at,
      product_type_id: product_type_id !== undefined ? product_type_id : "", // Set to empty string if undefined
    };

    const response = await axiosInstance.get(
      `/inventory/master-data/category/?status=true&search=${search}`,
      {
        params,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/category/${id}`);
    return response.data.data; // Return the specific UOM data
  } catch (error) {
    console.error("Error fetching by ID:", error);
    throw error;
  }
};


export const createCategoryProduct = async (data: CreateCategoryProductData) => {
  try {
    const response = await axiosInstance.post(`/inventory/master-data/category`, data);
    console.log("Respons:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error saat membuat kategori produk:", error);
    throw error;
  }
};

export const deleteCategoryById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/inventory/master-data/category/${id}`);
    return response.data.data; 
  } catch (error) {
    throw error;
  }
};

export const updateCategory = async (id: string, data: CreateCategoryProductData) => {
  try {
    const response = await axiosInstance.put(`/inventory/master-data/category/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

