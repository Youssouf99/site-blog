import axiosInstance from "../utils/axiosInstance";

const API_URL = "/auth"; // L'URL de base pour les endpoints d'authentification

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error; // Laissez le composant gérer l'erreur spécifique (ex: mauvais identifiants)
  }
};

export const logoutUser = async () => {
  try {
    const response = await axiosInstance.post(`${API_URL}/logoutCurrentUser`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
