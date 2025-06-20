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
export const getBrands = async (search: string = "") => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/brand/?search=${search}`);
    console.log("API Response:", response.data.data);  
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};


// Get active brand
export const getBrandById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/brand/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};


// Get active brand
export const getBrandByActive = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/brand/active`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new supplier
export const createBrand = async (data: {
name:string;
description: string;
status:string;
}) => {
  try {
    const response = await axiosInstance.post("/inventory/master-data/brand", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Update supplier by ID
export const updateBrand = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/inventory/master-data/brand/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete supplier by ID
export const deleteBrand = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/inventory/master-data/brand/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
