import axiosInstance from "../../../../../../../service/axiosInstance";

export const createPegawai = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/hr/master-data/employee`);
    return response.data;
  } catch (error) {}
};

export const getPegawai = async (
  search: string = "",
  status?: string,
  page?: number,
  size?: number,
  contract_type?: string | null,
  position_id?: string
) => {
  try {
    const params: Record<string, any> = {
      page,
      size,
      search,
      status,
      contract_type,
    };

    // Only include position_id in params if it has a value
    if (position_id) {
      params.position_id = position_id;
    }

    const response = await axiosInstance.get(`/hr/master-data/employee`, {
      params,
    });
    console.log(response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching employee data:", error);
    throw error;
  }
};
