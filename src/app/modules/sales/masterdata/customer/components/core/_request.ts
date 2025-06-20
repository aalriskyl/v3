
import axiosInstance from "../../../../../../../service/axiosInstance";



interface CustomerData {
  name: string;
  email: string;
  phone: string;
  status?: boolean;
  address: string;
  city_id: string;
  industry: string;
  contact_person: string;
  is_a_company?: boolean;
  is_company_id?: string | null;
}

// interface GetCustomerParams {
//   search?: string;
//   city?: string;
//   industry?: string;
//   status?: string; // Ubah ke string untuk query parameter
//   page?: number;
//   limit?: number;
//   size?: number;
//   company_id?: string;
// }

// interface GetCustomerResponse {
//   data: CustomerData[];
//   total: number;
// }

export const getCustomer = async (params?: {
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
    const response = await axiosInstance.get(`/sales/master-data/customer?${queryParams.toString()}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const updateCustomer = async (customerId: string, data: CustomerData) => {
    try {
        const response = await axiosInstance.put(`/sales/master-data/customer/${customerId}`, data);
        console.log("API Response (Update):", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
};

export const createCustomer = async (data: CustomerData) => {
    try {
        const response = await axiosInstance.post('/sales/master-data/customer', data);
        console.log("API Response (Create):", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
};

export const getCustomerById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/sales/master-data/customer/${id}`);
    console.log("API Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

export const deleteCustomer = async (customerId: string) => {
  try {
    const response = await axiosInstance.delete(`/sales/master-data/customer/${customerId}`);
    console.log("Customer deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};