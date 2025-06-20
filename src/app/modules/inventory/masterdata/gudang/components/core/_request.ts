import axiosInstance from "../../../../../../../service/axiosInstance";

interface ModelData {
  id?: string;
  name: string;
  address: string;
}

export const getAllGudang = async (
  search: string = "",
  page?: number,
  size?: number,
  created_at?: string
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/warehouse?search=${search}`,
      {
        params: {
          page,
          size,
          created_at,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching UOM:", error);
    throw error;
  }
};

export const getActiveUom = async () => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/uom/select`
    );
    console.log("API Response:", response.data.data);
    return response.data.data.uoms;
  } catch (error) {
    console.error("Error fetching UOM:", error);
    throw error;
  }
};

export const getGudangById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/warehouse/${id}`
    );
    // console.log("API Response (UOM by ID):", response.data);
    return response.data.data; // Return the specific UOM data
  } catch (error) {
    console.error("Error fetching UOM by ID:", error);
    throw error;
  }
};

export const createGudang = async (data: ModelData) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/master-data/warehouse`,
      data
    );
    console.log("Respons:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error saat membuat UOM:", error);
    throw error;
  }
};

export const updateGudang = async (id: string, data: ModelData) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/master-data/warehouse/${id}`,
      data
    );
    console.log("API Response (Update):", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating:", error);
    throw error;
  }
};

export const deleteUomById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/inventory/master-data/uom/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error saat menghapus uom:", error);
    throw error;
  }
};
