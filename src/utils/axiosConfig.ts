import axios from "axios";

const APP_URL = "https://welcome.bluetechnology.online/api";

export const APIs = {
  appURL: APP_URL,
  login: "login",
  products: "products",
  inventories: "inventories",
  transfers: "transfers",
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
    if (
      error.response?.status === 401 ||
      error.response?.data?.message === "Unauthenticated." ||
      error.response?.data?.message === "Token has expired"
    ) {

      localStorage.removeItem("userToken");

      const currentPath = window.location.pathname;
      if (!currentPath.includes("/login")) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(
      error.response?.data || { message: "حدث خطأ في السيرفر" }
    );
  }
);
