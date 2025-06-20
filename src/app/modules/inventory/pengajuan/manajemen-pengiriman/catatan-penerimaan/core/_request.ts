import axiosInstance from "../../../../../../../service/axiosInstance";

export const getAllWarehouse = async () => {
  try {
    const response = await axiosInstance(
      `/inventory/master-data/warehouse`
    );
    return response.data
  } catch (error) {
    throw error;
  }
}

export const getMaterialPurchaseOrder = async (id: string) => {
  try {
    const response = await axiosInstance (
      `/procurement/submission/purchase-order/purchase-order-material/purchase-order/${id}`
    )
    console.log('logmaterial', response.data)
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getAllPurchaseOrder = async () => {
  try {
    const response = await axiosInstance.get(
      `/procurement/submission/purchase-order`
    );
    console.log(response.data.data);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllPurchaseOrderSelect = async () => {
  try {
    const response = await axiosInstance.get(
      `/procurement/submission/purchase-order/select`
    );
    console.log(response.data);

    return response;
  } catch (error) {
    throw error;
  }
};



export const createReceivedNote = async (id: any, data: any ) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/submission/delivery-management/received-note/`, data
    );
    return response.data.data.id;
  } catch (error) {
    throw error;
  }
};

export const getAllReceivedNote = async (
  page?: number,
  size?: number
) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/received-note`,
      {
        params: {
          page,
          size
        }
      }
    );
    return response.data
  } catch (error) {
    throw error;
  }
}

export const getAllRnMaterial = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/received-note/received-note-material/received-note/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
}

export const updateRnMaterial = async (id: string, payload: any) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/submission/delivery-management/received-note/received-note-material/${id}`, payload
    );
    return response.data.data
  } catch (error) {
    throw error;
  }
}

export const updateRn = async (id: string, payload: any) => {
  try {
    const response = await axiosInstance.put(
      `/inventory/submission/delivery-management/received-note/${id}`, payload
    );
    return response.data.data
  } catch (error) {
    throw error;
  }
}

export const getSingleRn = async (id: string) => {
  try {
    const response = await axiosInstance.get(
      `/inventory/submission/delivery-management/received-note/${id}`
    );
    return response.data
  } catch (error) {
    throw error;
  }
}
