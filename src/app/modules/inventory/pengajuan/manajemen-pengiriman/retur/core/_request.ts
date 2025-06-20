/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import axiosInstance from "../../../../../../../service/axiosInstance";

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
//     Authorization: `Bearer ${token}`,
//   },
// });

export const getAllPengiriman = async (
  setTotalData?: React.Dispatch<React.SetStateAction<number>>,
  pageIndex?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/delivery-note?company_id=${localStorage.getItem(
        "company_id"
      )}`,
      {
        params: {
          page: pageIndex,
          size: pageSize,
        },
      }
    );
    console.log("API Response:", response); // Log the response
    if (setTotalData && pageSize) {
      setTotalData(response.data.data.total_page * pageSize);
    }
    return response.data.data.delivery_note;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSinglePengiriman = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/delivery-note/${id}?company_id=${localStorage.getItem(
        "company_id"
      )}`
    );
    console.log({ getSinglePengiriman: response.data.data }); // Log the response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getMaterialByBarcode = async (barcode: any) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/uom/barcode/${barcode}`
    );

    return response.data.data;
  } catch (e) {
    console.error("Error fetching customers:", e);
    throw e;
  }
};

export const getAllMaterialByPengirimanId = async (
  pengiriman_id: string,
  setTotalData?: React.Dispatch<React.SetStateAction<number>>,
  pageIndex?: number,
  pageSize?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/delivery-note/delivery-note-material/delivery-note/${pengiriman_id}?company_id=${localStorage.getItem(
        "company_id"
      )}`,
      {
        params: {
          page: pageIndex,
          size: pageSize,
        },
      }
    );
    console.log({ getAllMaterialByPengirimanId: response });
    if (setTotalData && pageSize) {
      setTotalData(response.data.data.total_page * pageSize);
    }
    return response.data.data.delivery_note_materials;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSingleMaterialById = async (material_id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/delivery-note/delivery-note-material/${material_id}?company_id=${localStorage.getItem(
        "company_id"
      )}`
    );
    console.log({ getSingleMaterialById: response }); // Log the response
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
export const getAllWarehouse = async () => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/warehouse?company_id=${localStorage.getItem(
        "company_id"
      )}`
    );
    console.log("API Response:", response); // Log the response
    return response.data.data.warehouses;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};
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

export const updatePlanProduction = async (
  id: string,
  data: PlanProductionData
) => {
  try {
    const response = await axiosInstance.put(
      `/ppic/plan-production/${id}`,
      data
    );
    // console.log("API Response (Update):", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw error;
  }
};

export const createPlanProduction = async (data: PlanProductionData) => {
  try {
    const response = await axiosInstance.post("/ppic/plan-production", data);
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

export const getActiveMaterial = async () => {
  try {
    const response = await axiosInstance.get(`/ppic/pengajuan/material/select`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleMaterial = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/ppic/pengajuan/plan-production/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllSalesOrder = async () => {
  try {
    const response = await axiosInstance.get(`/sales/submission/sales-order`);
    console.log({ getAllSalesOrder: response });
    return response.data.data.sales_orders;
  } catch (error) {
    throw error;
  }
};
export const getAllSalesOrderApproved = async () => {
  try {
    const response = await axiosInstance.get(
      `/sales/submission/sales-order/select?company_id=233b117c-1d96-4f4d-8289-6a6691088af6`
    );
    console.log({ getAllSalesOrderApproved: response.data.data });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getMaterialBySoId = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/sales/submission/sales-order/sales-order-material/sales-order/${id}`
    );
    // console.log({ response });
    return response.data.data.sales_order_materials;
  } catch (error) {
    throw error;
  }
};
