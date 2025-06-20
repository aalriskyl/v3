import axiosInstance from "../../../../../../../service/axiosInstance";

export const getAllLedger = async (
  search: string = "",
  status?: string,
  page?: number,
  size?: number,
  submitted_from?: string,
  submitted_to?: string,
  approved_from?: string,
  approved_to?: string
) => {
  try {
    const response = await axiosInstance.get(
      `/accounting/master-data/coa-transaction/ledger`,
      {
        params: {
          page,
          size,
          search,
          status,
          submitted_from,
          submitted_to,
          approved_from,
          approved_to,
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

export const getAllDetailLedger = async (
  id: string | undefined,
  search: string = "",
  status?: string,
  page?: number,
  size?: number,
  created_from?: string,
  created_to?: string
) => {
  try {
    const response = await axiosInstance.get(
      `/accounting/master-data/coa-transaction/ledger/${id}/transactions`,
      {
        params: {
          page,
          size,
          search,
          status,
          created_from,
          created_to,
        },
      }
    );
    console.log(response.data);
    return response.data || []; // Ensure a default structure
  } catch (error) {
    console.error("Error fetching ledger transactions:", error);
    throw error;
  }
};
