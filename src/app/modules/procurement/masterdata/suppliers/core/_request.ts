
import axiosInstance from "../../../../../../service/axiosInstance";


export const getSuppliers = async (params?: {
  search?: string;
  name?: string;
  city?: string;
  industry?: string;
  status?: boolean;
  page?: number;
  size?: number;
}) => {
  const queryParams = new URLSearchParams();

  if (params?.search) queryParams.append('search', params.search);
  if (params?.name) queryParams.append('name', params.name);
  if (params?.city) queryParams.append('city', params.city);
  if (params?.industry) queryParams.append('industry', params.industry);
  if (params?.page) queryParams.append('page', `${params.page}`);
  if (params?.size) queryParams.append('size', `${params.size}`);

  // Default status is true unless explicitly set to false
  const status = params?.status !== undefined ? params.status : true;
  queryParams.append('status', status.toString());

  // Debugging query params
  try {
    const response = await axiosInstance.get(`/procurement/master-data/supplier?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    throw error;
  }
};


export const updateSupplier = async (id: string, data: SupplierData) => {
    try {
        const response = await axiosInstance.put(`/procurement/master-data/supplier/${id}`, data);
        return response.data.data;
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
};

export const createSupplier = async (data: SupplierData) => {
    try {
        const response = await axiosInstance.post('/procurement/master-data/supplier', data);
        return response.data.data;
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
};

export const getSupplierById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/procurement/master-data/supplier/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

export const deleteSupplier = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/procurement/master-data/supplier/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export const getCompanySelect = async () => {
  try {
    const response = await axiosInstance.get(`/company/management-company/company/select`)
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}