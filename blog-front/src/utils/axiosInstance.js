import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // L'URL de base de votre API
});

// Ajout de l'intercepteur pour inclure le token JWT dans l'en-tête Authorization de chaque requête sortante
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
