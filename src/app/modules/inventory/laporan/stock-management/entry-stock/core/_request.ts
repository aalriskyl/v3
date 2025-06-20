import axios from "axios";

import axiosInstance from "../../../../../../../service/axiosInstance";

export const createEntryStock = async (
  data: {
    doc_type: string;
    remarks?: string;
  },
  id?: string
) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/submission/stock-management/stock-entry`,
      data
    );
    return response.data.data.id; // Return the ID of the created entry stock
  } catch (error) {
    throw error;
  }
};

export const getEntryStockById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-entry/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEntryStock = async (
  page?: number,
  size?: number,
  category_id?: string,
  search?: string,
  created_at?: string
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-entry?search=${search}`,
      {
        params: {
          page,
          size,
          created_at,
          category_id
        }
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUomMaterial = async (id: string) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/master-data/material/uom/select/${id}`
    );
    return response.data.data.uoms.map((uom: { id: string }) => uom.id);
  } catch (error) {
    throw error;
  }
};

export const getAllMaterialStockEntry = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-entry/stock-entry-material/stock-entry/${id}`
    );
    return response.data.data?.stock_entry_materials ?? [];
  } catch (error) {
    throw error;
  }
};

export const getSingleStockEntryMaterial = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-entry/stock-entry-material/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateStatusEntryStock = async (id: string) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/submission/stock-management/stock-entry/status/${id}`,
      { status: "Submitted" }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const updateStatusEntryStockApprove = async (id: string) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/submission/stock-management/stock-entry/status/${id}`,
      { status: "Approved" }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const updateStatusEntryStockSubmit = async (id: string) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/submission/stock-management/stock-entry/status/${id}`,
      { status: "Submitted" }
    );
    console.log({ response });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const updateStatusEntryStockReject = async (id: string) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/submission/stock-management/stock-entry/status/${id}`,
      { status: "Rejected" }
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createMaterialEntryStock = async (id: string, payload: any) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/submission/stock-management/stock-entry/stock-entry-material/${id}`,
      payload // Pass the payload as the request body
    );
    return response.data.data.id;
  } catch (error) {
    throw error;
  }
};

export const getMaterialSelect = async () => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material?status=true` // Include `id` if required
    );

    // Log the response for debugging
    console.log("API Response:", response.data);

    // Ensure the response structure matches what you expect
    if (response.data && response.data.data && response.data.data.materials) {
      return response.data.data.materials; // Return the materials array
    } else {
      throw new Error("Invalid API response structure");
    }
  } catch (error) {
    console.error("Error fetching material data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const getMaterialUomSelect = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/uom/select/${id}`
    );
    console.log(response.data.data.uoms);
    return response.data.data.uoms;
  } catch (error) {
    throw error;
  }
};

export const getUomSelect = async () => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/uom/select`,
      {}
    );
    console.log(response.data.data.uoms);
    return response.data.data.uoms;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
