import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_APP_API_URL;

// Helper function to retrieve token and company_id
const getAuthDetails = () => {
    const userLogin = localStorage.getItem("userLogin");
    let token = "";
    if (userLogin) {
        try {
            const userLoginObj = JSON.parse(userLogin);
            token = userLoginObj.token || "";
        } catch (e) {
            console.error("Error parsing userLogin:", e);
        }
    }
    const company_id = localStorage.getItem("company_id") || "";
    return { token, company_id };
};

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "ngrok-skip-browser-warning": "69420",
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use((config) => {
    const { token, company_id } = getAuthDetails();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json";
    }

    config.params = {
        ...config.params,
        company_id,
    };

    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("Server error:", {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
