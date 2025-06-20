import axiosInstance from "../../../../../../service/axiosInstance";

// Get all active finish goods
export const getFinishGoods = async (search: string = "") => {
  try {
    const response = await axiosInstance.get(`/ppic/master-data/finish-goods/active`);
    console.log("API Response:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching:", error);
    throw error;
  }
};

// Get single finish good by ID
export const getFinishGoodsById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/master-data/finish-goods/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching by ID:", error);
    throw error;
  }
};

// Get variants by finish goods ID
export const getVariantFinishGoodsById = async (finishGoodsId: string) => {
  try {
    const response = await axiosInstance.get(
      "/ppic/master-data/finish-goods/variant-finish-goods/",
      {
        params: {
          finish_goods_id: finishGoodsId
        }
      }
    );
    console.log("Variant API Response:", response.data);
    return response.data.data.variant_finish_goods;
  } catch (error) {
    console.error("Error fetching variants:", error);
    throw error;
  }
};