import axios from "axios";
import axiosInstance from "../../../../../../service/axiosInstance";
import { LayananFormData } from "../components/molecules/modals/AddLayananModal";
import { MaterialFormData } from "../components/molecules/modals/AddMaterialModalSupplier";
import axiosInstancePar from "../../../../../../service/axiosInstanceNoCompany";
const API_BASE_URL = import.meta.env.VITE_APP_API_URL;



interface PurchaseOrderPayload {
  material_request_id?: string;
  type: "Supplier" | "Warehouse";
  supplier_id?: string;
  warehouse_id?: string;
  term_of_condition: string;
  purchase_order_number?: string;
}

export const updatePo = async (id?: string, payload?: any) => {
  try {
    const response = await axiosInstance.put(
      `/procurement/submission/purchase-order/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}


export const getSingleMaterialRequestMaterial = async (id?: string) => {
  try{
  const response = await axiosInstance.get(
    `/procurement/submission/purchase-order/purchase-order-material/${id}`
  );
//  console.log(response.data);
 return response.data;
  } catch (error) {
    throw error
  }
} 

export const getAllServiceCompanyId = async (id: string) => {
  try {
    const response = await axiosInstancePar.get(`inventory/master-data/service?company_id=${id}`)
    // console.log('anjay', response.data.data.services)
    return response.data.data.services || [];
  } catch (error) {
    throw error;
  }
}

export const getSelectServiceBySupplierId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/service/select-supplier/${id}`)
    return response.data;
  } catch (error) {
    throw error;
  }
}



export const getAllServiceConversion = async (id: string) => {
  try {
    const response = await axiosInstancePar.get(`/inventory/master-data/service`)
    // console.log('anjay', response.data.data.services) ;
    return response.data.data.services || []
  } catch (error) {
  }
}

export const getAllMaterialRequest = async () => {
  try {
    const response = await axiosInstance.get(`/inventory/submission/delivery-management/material-request/select`)
    return response.data
  } catch (error) {
    throw error;
  }
}



export const getSingleMaterialRequest = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/submission/delivery-management/material-request/${id}`)
    // console.log(response.data.data)
    return response.data.data
  } catch (error) {
    throw error;
  }
}

export const createSingleMaterialRequest = async (dataToSubmit: any) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/submission/delivery-management/material-request`
    );
    return response.data.data;
  } catch (error) {
    console.error("Failed to create material request:", error);
    throw error; 
  }
};

export const getAllPurchaseOrder = async (
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
      `/procurement/submission/purchase-order`,
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

export const getAllServicePo = async (
  id?: string,
  search: string="",
  page?: number,
  size?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/procurement/submission/purchase-order/purchase-order-service/purchase-order/${id}?search=${search}`,
      {
        params: {
          page,
          size,
        }
      }
    );
    return response.data || [];
  } catch (error) {
    throw error;
  }
};

export const getAllPurchaseOrderMaterial = async (
  purchaseOrderId?: string,
  search: string="",
  page?: number,
  size?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/procurement/submission/purchase-order/purchase-order-material/purchase-order/${purchaseOrderId}?search=${search}`,
      {
        params: {
          page, // Add page parameter
          size, // Add size parameter
        },
      }
    );
    return response.data; // Ensure this returns the correct structure
  } catch (error) {
    throw error;
  }
};

export const getSinglePurchaseOrder = async (id?: string) => {
  try {
    const response = await axiosInstance.get(
      `/procurement/submission/purchase-order/${id}`
    )
    return response.data || [];
  } catch (error) {
    throw error;
  }
}


export const createServicePurchaseOrder = async (
  purchaseOrderId: string,
  data: LayananFormData
) => {
  try {
    const response = await axiosInstance.post(
      `/procurement/submission/purchase-order/purchase-order-service/${purchaseOrderId}`,
      data // Include the payload here
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getServiceSelect = async () => {
  try {
    const response = await axiosInstance.get("/inventory/master-data/service"); // Adjust the endpoint as needed
    return response.data.data.services;
  } catch (error) {
    console.error("Failed to fetch services:", error);
    throw error; // Rethrow the error for handling in the calling function
  }
};

export const getServiceSelectId = async () => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/service/select`
    );
    return response.data.data.services;
  } catch (error) {
    throw error;
  }
};


export const getServiceSupplierSelect = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/service/service-supplier/select/${id}`
    );
    // ("API Response:", response.data); // Debugging: Log the full response data
    return response.data.data.supplier_services; // Return the nested array directly
  } catch (error) {
    console.error("Failed to fetch supplier options:", error);
    throw error;
  }
};


export const createPurchaseOrderMaterial = async (
  purchaseOrderId: string,
  data: MaterialFormData
) => {
  try {
    const response = await axiosInstance.post(
      `/procurement/submission/purchase-order/purchase-order-material/${purchaseOrderId}`,
      data
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const updatePurchaseOrderMaterial = async (
  purchaseOrderId: string,
  data: MaterialFormData
) => {
  try {
    const response = await axiosInstance.put(
      `/procurement/submission/purchase-order/purchase-order-material/${purchaseOrderId}`,
      data
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createPurchaseOrder = async (payload?: any ) => {
  try {
    const response = await axiosInstance.post(
      `/procurement/submission/purchase-order/`,
      payload // Add payload as second parameter
    );
    return response.data.data.id;
  } catch (error) {
    throw error;
  }
};

export const getSupplierIsCompanyFalse = async() => {
  try {
    const response = await axiosInstance.get(
      `/procurement/master-data/supplier/select?is_a_company=false`
    )
   return response.data.data;
  } catch (error) {
    throw error;
  }
}

export const getSupplierIsCompanyTrue = async () => {
  try {
    const response = await axiosInstance.get(
      `/procurement/master-data/supplier/select?is_a_company=true`
    );

    return response.data.data;
  } catch (error) {
    throw error;
  }
};


export const updateStatusPo = async (id: string, body: { status: string }) => {
  try {
    const response = await axiosInstance.put(
      `/procurement/submission/purchase-order/status/${id}`,
      body // Add the request body here
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMaterialSelectBySupplier = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/select-supplier/${id}`
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}


export const getAllMaterialByCompanyId = async (id: string) => {
  try {
    const response = await axiosInstancePar.get(
      `/inventory/master-data/material/sellable?company_id=${id}`
    );
    // console.log("API Response:", response.data);

    if (!response.data || !response.data.data) {
      throw new Error("Invalid API response structure: data not found");
    }

    // Return the data array directly
    return response.data.data;
  } catch (error) {
    console.error("Error fetching materials:", error);
    throw new Error("Failed to fetch materials");
  }
};

export const getDetailMaterialPo = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/procurement/submission/purchase-order/purchase-order-material/${id}`
    )
    return response.data.data
  } catch (error) {
    throw error;
  }
}


export const getSingleMaterialRequestMaterials = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/material-request/material-request-material/material-request/${id}`
    );
    return response.data; // Kembalikan seluruh response data
  } catch (error) {
    throw error;
  }
};

export const getMaterialUomSelect = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/material/uom/select/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}


export const getSelectAllService = async (id?: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/service/select`)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getSelectAllServiceNoCompany = async (id?: string) => {
  try {
    const response = await axiosInstancePar.get(`/inventory/master-data/service/select?company_id=${id}`)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getAllServiceSupplierBySupplierID = async (id: any) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/service/select-supplier/${id}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}




export const getSingleMaterialPo = async (id: any) => {
  try {
    const response = await axiosInstance.get(
      `/procurement/submission/purchase-order/purchase-order-material/${id}`
    );
    return response.data || [];
  } catch (error) {
    throw error;
  }
}

export const getSingleServicePo = async (id: any) => {
  try {
    const response = await axiosInstance.get(
      `/procurement/submission/purchase-order/purchase-order-service/${id}`
    );
    return response.data || [];
  } catch (error) {
    throw error;
  }
}

export const updateServicePo = async (id: any, formData: any)=> {
  try {
    const response = await axiosInstance.put(
      `/procurement/submission/purchase-order/purchase-order-service/${id}`, formData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

