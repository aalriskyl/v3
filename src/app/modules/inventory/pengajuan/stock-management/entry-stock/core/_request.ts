import axios from "axios";

import axiosInstance from "../../../../../../../service/axiosInstance";


export const createEntryStock = async (data: {
  type: string;
  warehouse_id: string;
  remarks?: string;
},   id?: string) => {
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

export const getAllWarehouse = async () => {
  try {
    const response = await axiosInstance(`/inventory/master-data/warehouse`);
    return response.data;
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
  search: string = "",
  status?: string,
  page?: number,
  size?: number,
  submitted_from?: string,
  submitted_to?: string,
  approved_from?: string,
  approved_to?: string
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-entry`,
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
        },
      }
    );
    return response.data || [];
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

export const getAllMaterialStockEntry = async (
  id: string,
  search: string = "",
  page?: number,
  size?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-entry/stock-entry-material/stock-entry/${id}?search=${search}`,
      {
        params: {
          page, // Add page parameter
          size, // Add size parameter
        },
      }
    );
    return response.data ?? [];
  } catch (error) {
    throw error;
  }
};


export const getSingleStockEntryMaterial = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-entry/stock-entry-material/${id}`
    )
    return response.data.data
  } catch (error) {
    throw error;
  }
}


export const updateStatusEntryStock = async (id: string) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/submission/stock-management/stock-entry/status/${id}`,
      { status: "Submitted" } // Include the status in the request body
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateEntryStock = async(id: string, confirmData?: any) => {
try {
  const response = await axiosInstance.put(
    `/inventory/submission/stock-management/stock-entry/${id}`, confirmData
  );
  return response.data.data
} catch(error) {
  throw error;
}
}

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
      `/inventory/master-data/material/select` // Include `id` if required
    );
      return response.data; // Return the materials array
   
  } catch (error) {
    console.error("Error fetching material data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};


export const getMaterialUomSelect = async(id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/uom/select/${id}`
    );
    console.log(response.data.data.uoms)
    return response.data.data.uoms;
    } catch (error) {
    throw error;
  }
}


export const getUomSelect = async() => {
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
}

export const getMaterialUomByBarcode = async (barcode: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/uom/barcode/${barcode}`
    )
    return response.data.data
  }catch(e){
    throw e
  }
}