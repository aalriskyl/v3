
import axiosInstance from "../../../../../../../service/axiosInstance";

export const getItemBundling = async (search: string = "") => {
  try {
    // Include the search parameter in the query if needed
    const response = await axiosInstance.get(`/inventory/master-data/item-bundling`, { params: { search } });
    console.log("API Response:", response.data.data.item_bundlings);  // Log the response
    // Return the item_bundlings array
    return response.data.data.item_bundlings;
  } catch (error) {
    console.error("Error fetching item bundling data:", error);
    throw error;
  }
}

// api.ts
export const getActiveFinishGoods = async () => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/finish-goods/active`);
    return response.data.data; // Array of Finish Goods
  } catch (error) {
    console.error("Error fetching active finish goods:", error);
    throw error;
  }
};

export const getFinishGoodVariants = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/ppic/master-data/finish-goods/${id}`);
    return response.data.data.variant_finish_goods; // Array of variants with IDs
  } catch (error) {
    console.error("Error fetching finish good variants:", error);
    throw error;
  }
};

export const createItemBundling = async (data: {
  name: string;
  disc_percent?: number;
  disc_nominal?: number;
  variant_finish_goods_ids: string[];
}) => {
  try {
    const response = await axiosInstance.post(
      `/inventory/master-data/item-bundling`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating item bundling:", error);
    throw error;
  }
};


