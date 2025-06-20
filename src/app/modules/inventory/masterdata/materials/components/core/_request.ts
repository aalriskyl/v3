import { isRouteErrorResponse } from "react-router-dom";
import axiosInstance from "../../../../../../../service/axiosInstance";
import { Materials } from "../molecules/core/_models";
interface Category {
  id: string;
  name: string;
}

type UomFormData = {
  uom_actual_id: string;
  uom_conversion_id: string;
  conversion: number;
  // sell_price: number;
  sku: string;
  barcode: number;
  uom_default: boolean;
  uom_default_buy: boolean;
  uom_default_sell: boolean;
  uom_sellable: boolean;
};

export interface MaterialById {
  id: string;
  name: string;
  created_at: string;
  category: {
    id: string;
    name: string;
  };
  uom_default: {
    id: string;
    name: string;
  };
  brand: {
    id: string;
    name: string;
  };
  status: boolean;
  picture: string;
  description?: string;
  default_uom?: string;
  // default_sale?: boolean;
}

interface CreateMaterialSupplierPayload {
  supplier_id: string;
  priority_supplier: number;
  default_supplier: boolean;
  buy_price: number;
}

// Get brands
export const getMaterials = async (
  search: string = "",
  page?: number,
  size?: number,
  category_id?: string
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/?search=${search}&status=true`,
      {
        params: {
          page,
          size,
          category_id,
        },
      }
    );
    // console.log("API Response:", response.data.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getMaterialsCategory = async (
  search: string = ""
): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get(
      "/inventory/master-data/category/select?product_type_id=1&purchasable=&sellable=true"
    );
    // console.log("API Response:", response.data.data);
    return response.data.data.categories; // Ensure this matches the expected type
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getActiveBrands = async () => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/brand/select`
    );
    return response.data.data.brands;
  } catch (error) {
    console.error("error nih", error);
    throw error;
  }
};

export const getMaterialsById = async (
  id: string
): Promise<MaterialById | null> => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching material:", error);
    return null; // Return null or handle as needed
  }
};

export const getMaterialUomById = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/uom/${id}`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log("error nih gatau kenapa iyah", error);
    return null;
  }
};

export const getHpp = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/stock-management/stock-history/hpp/${id}`
    );
    console.log("responsenya: ", response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getUomFromMaterialId = async (
  id: string,
  search: string,
  page?: number,
  size?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/uom/material/${id}?search=${search}`,
      {
        params: {
          page,
          size,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log("error nih gatau kenapa iyah", error);
  }
};

export const deleteUomFromMaterial = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/inventory/master-data/material/uom/${id}`
    );
    return response.data.data;
  } catch (error) {
    console.log("error nig gatau kenapa iyah", error);
  }
};

export const updateUomFromMaterial = async (id: string, payload: any) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/master-data/material/uom/${id}`,
      payload
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getActiveUoms = async () => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/uom/select`
    );
    return response.data.data.uoms;
  } catch (error) {
    throw error;
  }
};

export const deleteSupplierFromUom = async (supplier_id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/inventory/master-data/material/supplier/${supplier_id}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw error;
  }
};

export const getActiveSuppliers = async () => {
  try {
    const response = await axiosInstance.get(
      `/procurement/master-data/supplier/select`
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

// Get active brand
export const getMaterialsByActive = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/material`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Create a new supplier
export const createMaterials = async (data: any) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("category_id", data.category_id); // Sesuai dengan API
    formData.append("brand_id", data.brand_id); // Sesuai dengan API
    if (data.description) formData.append("description", data.description);
    if (data.uom_default_id !== undefined)
      formData.append("uom_default_id", String(data.uom_default_id));
    // if (data.default_sale !== undefined) formData.append("default_sale", String(data.default_sale));

    if (data.picture) {
      formData.append("picture", data.picture);
    }

    const response = await axiosInstance.post(
      "/inventory/master-data/material",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data.data.id;
  } catch (error) {
    throw error;
  }
};

// Update supplier by ID
export const updateMaterials = async (id: string, data: any) => {
  try {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("category_id", data.category_id); // Sesuai dengan API
    formData.append("brand_id", data.brand_id); // Sesuai dengan API
    if (data.description) formData.append("description", data.description);
    if (data.uom_default_id !== undefined)
      formData.append("uom_default_id", String(data.uom_default_id));
    // if (data.default_sale !== undefined) formData.append("default_sale", String(data.default_sale));

    if (data.picture) {
      formData.append("picture", data.picture);
    }

    const response = await axiosInstance.put(
      `/inventory/master-data/material/${id}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

// Delete supplier by ID
export const deleteMaterials = async (id: string) => {
  try {
    const response = await axiosInstance.delete(
      `/inventory/master-data/material/${id}`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createMaterialSuppliers = async (
  id: string,
  payload: CreateMaterialSupplierPayload
) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/master-data/material/supplier/${id}`,
      payload
    );
    return response.data.data.id;
  } catch (error) {
    throw error;
  }
};

export const getMaterialSuppliersByUomId = async (
  id: string,
  search: string,
  page?: number,
  size?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/supplier/uom/${id}?search=${search}`,
      {
        params: {
          page,
          size,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getSingleMaterialSuppliers = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/supplier/${id}`
    );
    // console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createUoms = async (id: string, data: UomFormData) => {
  try {
    if (!id) throw new Error("Material ID is undefined");

    const response = await axiosInstance.post(
      `/inventory/master-data/material/uom/${id}`,
      data
    );

    // Return the full response
    return response;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
