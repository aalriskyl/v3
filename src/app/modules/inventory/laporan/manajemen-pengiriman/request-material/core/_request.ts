import axios from "axios";

import axiosInstance from "../../../../../../../service/axiosInstance";



export const getSuppliers = async () => {
  try {
    const response = await axiosInstance.get(`/procurement/supplier`);
    // console.log("API Response:", response.data);  // Log the response
    return response.data.data.supplier;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const updateSupplier = async (id: string, data: SupplierData) => {
    try {
        const response = await axiosInstance.put(`/procurement/supplier/${id}`, data);
        // console.log("API Response (Update):", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
};

export const createSupplier = async (data: SupplierData) => {
    try {
        const response = await axiosInstance.post('/procurement/supplier', data);
        // console.log("API Response (Create):", response.data);
        return response.data.data; // Return created customer data
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
};

export const getSupplierById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/procurement/supplier/${id}`);
    // console.log("API Response:", response.data.data);  
    return response.data.data;  
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};


export const deleteCustomer = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/procurement/supplier/${id}`);
    // console.log("Customer deleted successfully:", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
