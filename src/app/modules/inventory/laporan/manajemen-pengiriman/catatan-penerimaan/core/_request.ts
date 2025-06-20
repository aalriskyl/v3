import { dataTagErrorSymbol } from "@tanstack/react-query";
import axiosInstance from "../../../../../../../service/axiosInstance";



export const getAllPurchaseOrder = async(
  page?: number,
  size?: number
) => {
try {
    const response = await axiosInstance.get(
    `/procurement/submission/purchase-order`, {
      params: {
        page,
        size
      }
    }
  );
    console.log(response.data);

  return response.data;
} catch (error) {
  throw error;
}
}

export const createRecievedNote = async () => {
  try {
    const response = await axiosInstance.post(
      `/inventory/submission/delivery-management/received-note`
    );
    return response.data.data
  } catch (error) {
    throw error;
  }
}