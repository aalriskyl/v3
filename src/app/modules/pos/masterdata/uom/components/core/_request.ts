import axiosInstance from "../../../../../../../service/axiosInstance";

interface ModelData {
  name: string;
}

export const getUom = async () => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/uom`);
    console.log("API Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching UOM:", error);
    throw error;
  }
};


export const getActiveUom = async () => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/uom/select`);
    console.log("API Response:", response.data.data);
    return response.data.data.uoms;
  } catch (error) {
    console.error("Error fetching UOM:", error);
    throw error;
  }
};

export const getUomById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/uom/${id}`);
    console.log("API Response (UOM by ID):", response.data);
    return response.data.data; // Return the specific UOM data
  } catch (error) {
    console.error("Error fetching UOM by ID:", error);
    throw error;
  }
};

export const createUom = async (data: ModelData) => {
  try {
    const response = await axiosInstance.post(`/inventory/master-data/uom`, data);
    console.log("Respons:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error saat membuat UOM:", error);
    throw error;
  }
};

export const updateUom = async (id: string, data: ModelData) => {
  try {
    const response = await axiosInstance.put(`/inventory/master-data/uom/${id}`, data);
    console.log("API Response (Update):", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating:", error);
    throw error;
  }
};

export const deleteUomById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/inventory/master-data/uom/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error saat menghapus uom:", error);
    throw error;
  }
};