import axiosInstance from "../../../../../../service/axiosInstance";

// Get brands
export const getBrands = async (
  search: string = "",
  page?: number,
  size?: number,
  created_at?: string

) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/master-data/brand?search=${search}`,
      {
        params: {
          page,
          size,
          created_at,
        },
      }
    );
    return response.data;
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
    const response = await axiosInstance.get(`/inventory/master-data/brand/select`);
    return response.data.data.brands;
  } catch (error) {
    throw error;
  }
};

export const createBrand = async (formData: FormData) => {
    try {
        const response = await axiosInstance.post('/inventory/master-data/brand', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error creating brand:', error);
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
