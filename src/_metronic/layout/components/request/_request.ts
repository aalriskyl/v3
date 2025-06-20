import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

const url = API_BASE_URL;

interface Company {
  id: string;
  name: string;
  created_at: string;
  type: string;
  owner: string;
  status: boolean;
}

interface ProfileResponse {
  data: {
    user: {
      id: string;
      // other user properties...
    };
    companies?: Company[]; // Optional array of companies
    company?: Company; // Or possibly a single company
    // other profile properties...
  };
}

interface CompaniesResponse {
  data: Company[];
}

export const getProfile = async (): Promise<ProfileResponse["data"]> => {
  try {
    const userLoginStr = localStorage.getItem("userLogin");
    if (!userLoginStr) {
      throw new Error("userLogin not found in localStorage");
    }

    const userLogin = JSON.parse(userLoginStr) as { user?: { id?: string } };
    const userId = userLogin?.user?.id;

    if (!userId) {
      throw new Error("User ID not found in userLogin data");
    }

    const response = await axios.get<ProfileResponse>(
      `${url}/hr/master-data/employee/profile/${userId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const getCompaniesId = async (id: string) => {
  try {
    const response = await axios.get(
      `${url}/company/management-company/company/${id}`
    );
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
