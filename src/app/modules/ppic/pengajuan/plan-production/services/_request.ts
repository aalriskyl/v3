import axiosInstance from "../../../../../../service/axiosInstance";

// Get all plan productions (optional search parameter)
export const getPlanProduction = async (search = "") => {
  try {
    const response = await axiosInstance.get(`/ppic/pengajuan/plan-production/${search}`);
    return response.data.data.stock_entries;
  } catch (error) {
    console.error("Error fetching plan production data:", error);
    throw error;
  }
};

// Get a single plan production by ID
export const getPlanProductionById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/ppic/pengajuan/plan-production/${id}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching plan production with ID ${id}:`, error);
    throw error;
  }
};

// Create a new plan production entry
export const createPlanProduction = async (data: any) => {
  try {
    const response = await axiosInstance.post("/ppic/pengajuan/plan-production", data);
    return response.data.data.planproduction;
  } catch (error) {
    console.error("Error creating plan production:", error);
    throw error;
  }
};

// Update an existing plan production by ID
export const updatePlanProduction = async (id: string, data: any) => {
  try {
    const response = await axiosInstance.put(`/ppic/pengajuan/plan-production/${id}`, data);
    return response.data.data.planproduction;
  } catch (error) {
    console.error(`Error updating plan production with ID ${id}:`, error);
    throw error;
  }
};

// Delete a plan production by ID
export const deletePlanProduction = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/ppic/pengajuan/plan-production/${id}`);
    return response.data.data.planproduction;
  } catch (error) {
    console.error(`Error deleting plan production with ID ${id}:`, error);
    throw error;
  }
};
