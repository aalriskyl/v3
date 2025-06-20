import axios from "axios";
import axiosInstance from "../../../../../../service/axiosInstance";

export const getSingleMaterialSalesOrderById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/sales/submission/sales-order/sales-order-material/${id}`
    );
    console.log({ getSingleMaterialSalesOrderById: response.data.data });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSingleServiceSalesOrderById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/sales/submission/sales-order/sales-order-service/${id}`
    );
    console.log({ getSingleServiceSalesOrderById: response.data.data });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSingleSalesOrderById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/sales/submission/sales-order/${id}?company_id=${localStorage.getItem(
        "company_id"
      )}`
    );
    console.log({ getSingleSalesOrderById: response.data.data });
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const getSuppliers = async () => {
  try {
    const response = await axiosInstance.get(`/purchasing/purchase-order`);
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
      `/purchasing/purchase-order/${id}`,
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
    const response = await axiosInstance.post(
      "/purchasing/purchase-order",
      data
    );
    // console.log("API Response (Create):", response.data);
    return response.data.data; // Return created customer data
  } catch (error) {
    console.error("Error creating customer:", error);
    throw error;
  }
};

export const getSupplierById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/purchasing/purchase-order/${id}`
    );
    // console.log("API Response:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching customer by ID:", error);
    throw error;
  }
};

export const deleteCustomer = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/purchasing/purchase-order/${id}`
    );
    // console.log("Customer deleted successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
};
