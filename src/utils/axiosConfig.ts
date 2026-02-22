import axios from "axios";

const APP_URL = "http://192.168.1.10:8000/api";

export const APIs = {
  appURL :APP_URL,
  login: "login",
  products:"products",
  inventories: "inventories",
  transfers: "transfers",
  // productsDetails: (id: number | string) => `inventory-products/${id}`,
}
export const axiosConfig = axios.create({
  baseURL: APP_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


axiosConfig.interceptors.response.use(
  (response) => response,
  (error) => {
    console.dir(error);
    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "Unauthenticated." ||
      error.response?.data?.message === "Token has expired"
      
    )
    return Promise.reject(error); {
      // Clear all localStorage
      localStorage.removeItem("userToken");
      // Get current location
      const currentPath = window.location.pathname;

      // Only redirect if not already on login page
      if (!currentPath.includes("/login")) {
        // Redirect to login page
        window.location.href = "/login";
      }
    }
    return Promise.reject(
      (error.response && error.response.data) || "Wrong Services"
    );
  }
);

