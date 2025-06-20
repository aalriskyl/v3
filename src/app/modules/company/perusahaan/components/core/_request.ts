
import axiosInstance from "../../../../../../service/axiosInstance";


interface CompanyFormData {
  id?: string;
  name: string;
  // owner: string;
  type: string;
  address: string;
  created_at?: string;
  updated_at?: string;
}


export const getCompany = async (
  search: string = "",
  status?: string,
  page?: number,
  size?: number,
  submitted_from?: string,
  submitted_to?: string,
  approved_from?: string,
  approved_to?: string,
) => {
  try {
    const response = await axiosInstance.get(
      `/company/management-company/company`,
      {
        params: {
          page,
          size,
          search,
          status,
          submitted_from,
          submitted_to,
          approved_from,
          approved_to
        },
      }
    );
    console.log(response.data);
    return response.data || []; // Ensure a default structure
  } catch (error) {
    console.error("Error fetching purchase orders:", error); // Log the error for debugging
    throw error; // Rethrow the error for handling in the calling function
  }
};



export const updateCompany = async (id: string, data: CompanyFormData) => {
  try {
    const response = await axiosInstance.put(
      `/company/management-company/company/${id}`,
      data
    );
    console.log("API Response (Update):", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating:", error);
    throw error;
  }
};


export const createCompany = async (data: CompanyFormData) => {
    try {
        const response = await axiosInstance.post('/company/management-company/company', data);
        console.log("API Response (Create):", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error creating company:", error);
        throw error;
    }
};


export const getCompanyById = async(id: string) => {
  try {
    const response = await axiosInstance.get(`/company/management-company/company/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export const deleteCompany = async(id: string) => {
  try {
    const response = await axiosInstance.delete(`/company/management-company/company/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
}