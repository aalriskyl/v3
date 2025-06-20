/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-useless-catch */

import axiosInstance from "../../../../../../../service/axiosInstance";
import { GetParams } from "../../../../../../types/searchParams";

interface CreateCategoryProductData {
  name: string;
  desc?: string;
  product_type_id: number;
}


export const createJenisMeja = async (data: any) => {
  try{
    const response = await axiosInstance.post('/pos/table-type', data)
    return  response.data.data
  }catch(e){
    throw e;
  }
}


export const getJenisMeja = async () => {
  try {
    const response = await axiosInstance.get(`/pos/table-type`);
    console.log("API Response:", response.data.data.table_types);  // Log the response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product type:", error);
    throw error;
  }
};


export const getCategoryProduct = async () => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/category?status=true`, {
    });
    console.log(response.data.data.categories);
    return response.data.data.categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const getJenisMejaById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/pos/table-type/${id}`);
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

export const deleteJenisMeja = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/pos/table-type/${id}`);
    return response.data.data; 
  } catch (error) {
    throw error;
  }
};

export const updateJenisMeja  = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/pos/table-type/${id}`, data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

