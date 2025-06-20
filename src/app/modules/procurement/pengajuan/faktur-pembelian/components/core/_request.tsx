import axiosInstance from "../../../../../../../service/axiosInstance";


export const getAllFakturPembelian = async (
    search: string = "",
    status?: string,
    status_payment?: string,
    page?: number,
    size?: number,
    submitted_from?: string,
    submitted_to?: string,
    approved_from?: string,
    approved_to?: string,
    due_date_from?: string,
    due_date_to?: string,
    requested_from?: string,
    requested_to?: string,
  ) => {
    try {
      const response = await axiosInstance.get(
        `/procurement/submission/purchase-invoice`,
        {
          params: {
            page,
            size,
            search,
            status,
            status_payment,
            submitted_from,
            submitted_to,
            approved_from,
            approved_to,
            due_date_from,
            due_date_to,
            requested_from,
            requested_to,
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