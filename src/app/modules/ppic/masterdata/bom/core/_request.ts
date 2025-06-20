import axiosInstance from "../../../../../../service/axiosInstance";

// Get brands
export const getScheme = async (search: string = "") => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/price-scheme`);
    console.log("API Response:", response.data.data);  
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// Get active brand
export const getSchemeById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/price-scheme/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSchemeActive = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/price-scheme/select?status=active`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createScheme = async (data: {
name:string;
type: string;
}) => {
  try {
    const response = await axiosInstance.post("/inventory/master-data/price-scheme", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateScheme = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/inventory/master-data/price-scheme/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteScheme = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/inventory/master-data/price-scheme/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

/* import axiosInstance from "../../../../../../service/axiosInstance";

// Get brands
export const getBom = async (search: string = "") => {
  try {
    const response = await axiosInstance.get(`/ppic/master-data/bom`);
    console.log("API Response:", response.data.data);  
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// Get active brand
export const getBomById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/ppic/master-data/bom/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getBomActive = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/ppic/master-data/bom/select?status=active`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBom = async (data: {
name:string;
type: string;
}) => {
  try {
    const response = await axiosInstance.post(`/ppic/master-data/bom`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const updateBom = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/ppic/master-data/bom/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const deleteBom = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/ppic/master-data/bom/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; */

