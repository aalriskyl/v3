import axios from "axios";

// Access the base API URL from environment variables
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



export const getPlanProduction = async () => {
  try {
    const response = await axiosInstance.get(`/ppic/plan-production`);
    // console.log("API Response:", response.data);  // Log the response
    return response.data.data.planproduction;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const updatePlanProduction = async (id: string, data: PlanProductionData) => {
    try {
        const response = await axiosInstance.put(`/ppic/plan-production/${id}`, data);
        // console.log("API Response (Update):", response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error updating customer:", error);
        throw error;
    }
};

export const createPlanProduction = async (data: PlanProductionData) => {
    try {
        const response = await axiosInstance.post('/ppic/plan-production', data);
        // console.log("API Response (Create):", response.data);
        return response.data.data; // Return created customer data
    } catch (error) {
        console.error("Error creating customer:", error);
        throw error;
    }
};

export const getPlanProductionById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/ppic/plan-production/${id}`);
    // console.log("API Response:", response.data.data);  
    return response.data.data;  
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};


export const deleteCustomer = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/ppic/plan-production/${id}`);
    // console.log("Customer deleted successfully:", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export const getActiveMaterial = async() => {
  try {
    const response = await axiosInstance.get(`/ppic/pengajuan/material/select`);
        console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleMaterial = async(id: string) => {
  try {
    const response = await axiosInstance.get(
      `/ppic/pengajuan/plan-production/${id}`
    )
    return response.data.data
  } catch (error){
    throw error;
  }
}
