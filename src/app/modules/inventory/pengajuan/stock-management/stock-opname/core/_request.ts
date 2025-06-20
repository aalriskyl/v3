import axios from "axios";
import axiosInstance from "../../../../../../../service/axiosInstance";
import {
  getAllMaterialByOpnameIdType,
  getAllOpnameType,
  getSelectWirehouseOpnameType,
  getSingleMaterialOpnameByIdType,
  getSingleOpnameType,
} from "./_models";

// Access the base API URL from environment variables
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const userLogin = localStorage.getItem("userLogin");
let token = "";
if (userLogin) {
  try {
    const userLoginObj = JSON.parse(userLogin);
    token = userLoginObj.token || "";
  } catch (e) {
    console.error("Error parsing userLogin:", e);
  }
}

// const axiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//     "Authorization": `Bearer ${token}`
//   },
// });

export const getAllOpname = async (): Promise<getAllOpnameType> => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-opname?company_id=${localStorage.getItem(
        "company_id"
      )}`
    );
    console.log({ getAllOpname: response.data.data.stock_opnames });
    return response.data.data.stock_opnames;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSingleOpname = async (
  id: string
): Promise<getSingleOpnameType> => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-opname/${id}?company_id=${localStorage.getItem(
        "company_id"
      )}`
    );
    console.log({ getSingleOpname: response.data.data });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getAllMaterialByOpnameId = async (
  opname_id: string
): Promise<getAllMaterialByOpnameIdType> => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-opname/stock-opname-material/stock-opname/${opname_id}?company_id=${localStorage.getItem(
        "company_id"
      )}`
    );
    console.log({
      getAllMaterialByOpnameId: response.data.data,
    }); // Log the response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSingleMaterialOpnameById = async (
  material_id: string
): Promise<getSingleMaterialOpnameByIdType> => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-opname/stock-opname-material/${material_id}?company_id=${localStorage.getItem(
        "company_id"
      )}`
    );
    console.log({
      getSingleMaterialOpnameById: response.data.data,
    }); // Log the response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSelectWirehouseOpname =
  async (): Promise<getSelectWirehouseOpnameType> => {
    try {
      const response = await axiosInstance.get(
        `/inventory/master-data/warehouse?company_id=${localStorage.getItem(
          "company_id"
        )}`
      );
      console.log({
        getSelectWirehouseOpname: response.data.data.warehouses,
      });
      return response.data.data.warehouses;
    } catch (error) {
      console.error("Error fetching customers:", error);
      throw error;
    }
  };

export const getSuppliers = async () => {
  try {
    const response = await axiosInstance.get(`/procurement/supplier`);
    // console.log("API Response:", response.data);  // Log the response
    return response.data.data.supplier;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const updateSupplier = async (id: string, data: SupplierData) => {
  try {
    const response = await axiosInstance.put(
      `/procurement/supplier/${id}`,
      data
    );
    // console.log("API Response (Update):", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const createSupplier = async (data: SupplierData) => {
  try {
    const response = await axiosInstance.post("/procurement/supplier", data);
    // console.log("API Response (Create):", response.data);
    return response.data.data; // Return created customer data
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const getSupplierById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/procurement/supplier/${id}`);
    // console.log("API Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/procurement/supplier/${id}`);
    // console.log("Customer deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};

export const getAllStockOpname = async(
  search: string = "",
  status?: string,
  page?: number,
  size?: number,
  submitted_from?: string,
  submitted_to?: string,
  approved_from?: string,
  approved_to?: string
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-opname`,
      {
        params: {
          page,
          size,
          search,
          status,
          submitted_from,
          submitted_to,
          approved_from,
          approved_to,
        },
      }
    );
    return response.data || [];
  } catch (error) {
    throw error;
  }
}
