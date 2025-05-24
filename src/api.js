import axios from "axios";

export const IMAGE_BASE_URL = "http://localhost:8000/storage/";
export const IMAGE_BASE_URL2 = "http://localhost:8000/storage/";


const API_URL = "http://localhost:8000/api/"; 
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export default apiClient;