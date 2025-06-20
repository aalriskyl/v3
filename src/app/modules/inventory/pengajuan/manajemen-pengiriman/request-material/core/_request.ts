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

export const getSupplierIsCompanyFalse = async() => {
  try {
    const response = await axiosInstance.get(
      `/procurement/master-data/supplier/select?is_a_company=false`
    )
   return response.data.data;
  } catch (error) {
    throw error;
  }
}

export const getSupplierIsCompanyTrue = async () => {
  try {
    const response = await axiosInstance.get(
      `/procurement/master-data/supplier/select?is_a_company=true`
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllMaterialRequest = async (
  search: string = "",
  status?: string,
  page?: number,
  size?: number,
  submitted_from?: string,
  submitted_to?: string,
  approved_from?: string,
  approved_to?: string,
  type?: string
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/material-request`,
      {
        params: {
          page,
          size,
          search,
          status,
          submitted_from,
          submitted_to,
          approved_from,
          approved_to,
          type,
        },
      }
    );
    return response.data || []; // Ensure a default structure
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const getAllMaterialRequestMaterial = async (
  id: string | undefined,
  search: string = "",
  page?: number,
  size?: number,

) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/material-request/material-request-material/material-request/${id}`,
      {
        params: {
          page,
          size,
          search,
        },
      }
    );
    return response.data || []; // Ensure a default structure
  } catch (error) {
    throw error; // Rethrow the error for handling in the calling function
  }
};