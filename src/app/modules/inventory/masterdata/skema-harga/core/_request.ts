import axios from "axios";


const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const userLogin = localStorage.getItem('userLogin');
let token = '';
if (userLogin) {
  try {
    const userLoginObj = JSON.parse(userLogin);
    token = userLoginObj.token || '';
  } catch (e) {
    console.error('Error parsing userLogin:', e);
  }
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}` 
  },
});

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
