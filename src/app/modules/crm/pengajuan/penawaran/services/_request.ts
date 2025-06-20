import axios from "axios";

import axiosInstance from "../../../../../../service/axiosInstance";


export const getEntryStock = async (search: string = "") => {
  try {
    const response = await axiosInstance.get(`/inventory/submission/stock-management/stock-entry/${search}`);
    return response.data.data.stock_entries; // Fix property name here
  } catch (error) {
    console.error("Error fetching stock entries:", error); // Update error message
    throw error;
  }
};


// Get supplier by ID
export const getEntryStockById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/submission/stock-management/stock-entry/${id}`);
    return response.data.data; 
  } catch (error) {
    throw error;
  }
};



export const createEntryStock = async (data: {
  entry_number: string
  type: string
  status: string
}) => {
  try {
    const response = await axiosInstance.post("/inventory/submission/stock-management/stock-entry", data);
    return response.data.data.suppliers;
  } catch (error) {
    throw error;
  }
};

// Update supplier by ID
export const updateEntryStock = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/inventory/submission/stock-management/stock-entry/${id}`, data);
    return response.data.data.suppliers;
  } catch (error) {
    throw error;
  }
};

// Delete supplier by ID
export const deleteEntryStock = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/inventory/submission/stock-management/stock-entry/${id}`);
    return response.data.data.suppliers;
  } catch (error) {
    throw error;
  }
};
