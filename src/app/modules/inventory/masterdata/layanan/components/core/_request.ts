import axiosInstance from "../../../../../../../service/axiosInstance";

export const getService = async (
  page?: number,
  size?: number,
  category_id?: string,
  search?: string,
  created_at?: string

) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/service?status=true&search=${search}&category_id=${category_id}`,
      {
        params: {
          page,
          size,
          category_id,
          created_at
        }
      }
    );

    // Filter hanya yang status = true
    return response.data;
  } catch (error) {
    console.error("Error fetching product type:", error);
    throw error;
  }
};



export const deleteService = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/inventory/master-data/service/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const getAllServiceSupplierByServiceId = async (
  id: string,
  search: string,
  page?: number,
  size?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/service/service-supplier/service/${id}?search=${search}`,
      {
        params: {
          page,
          size,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching service suppliers:", error);
    throw error;
  }
};

export const createServiceSupplier = async (id: string, payload: any) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/master-data/service/service-supplier/${id}`, 
      payload 
    );
    return response.data.id;
  } catch (error) {
    throw error;
  }
};

export const getSingleServiceSupplier = async(id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/service/service-supplier/${id}`
    )
    return response.data.data
  } catch (error){
    throw error;
  }
}

export const deleteServiceSupplier = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/inventory/master-data/service/service-supplier/${id}`)
    return response.data.data;
  } catch (error) {
    throw error;
  }
}


export const getServiceById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/service/${id}`);
    console.log("API Response:", response.data);  
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product type:", error);
    throw error;
  }
};

export const updateService = async (
  id: string,
  serviceData: {
    name: string;
    category_id: string;
    brand_id: string;
    default_purchase?: boolean;
    default_sale?: boolean;
    description?: string;
  }
): Promise<string | undefined> => {
  try {
    const response = await axiosInstance.put(
      `/inventory/master-data/service/${id}`,
      serviceData
    );
    return response.data.data.id; // Assuming the response contains the updated service ID
  } catch (error) {
    throw error;
  }
};

export const createService = async (
  data: {
    name: string;
    desc?: string;
    category_id: string;
    brand_id: string;
    default_purchase?: boolean;
    default_sale?: boolean;
  },
) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/master-data/service`,
      data
    );
    console.log("Response:", response.data.data);
    return response.data.data.id; // Return the serviceId
  } catch (error) {
    console.error("Error saat membuat kategori produk:", error);
    throw error;
  }
};

export const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/inventory/master-data/category/select?product_type_id=2');
                return response.data.data.categories;
            } catch (err) {
                console.error('Error fetching categories:', err);
            }
        };

export interface SupplierFormData {
  // Form Fields
  supplier_id?: string;
  buy_price?: string | number; // String for form input, number for payload
  sell_price?: string | number;
  supplier_priority?: number;
  set_default?: string[]; // For checkbox group
  status?: boolean;

  // Transformed Payload
  default_supplier?: boolean;
}

export const updateServiceSupplier = async (
  serviceId: string,
  supplierId: string,
  payload: SupplierFormData
) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/master-data/service/service-supplier/${supplierId}`,
      payload
    );
    return response.data.data;
  } catch (error) {
   throw error;
  }
};

