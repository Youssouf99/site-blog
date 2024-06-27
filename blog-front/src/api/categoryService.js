import axiosInstance from "../utils/axiosInstance";

const API_URL = "/categories"; // Base URL for category endpoints

export const getAllCategories = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCategoryById = async (categoryId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCategory = async (categoryRequestDTO) => {
  try {
    const response = await axiosInstance.post(API_URL, categoryRequestDTO);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryId) => {
  try {
    await axiosInstance.delete(`${API_URL}/${categoryId}`);
  } catch (error) {
    throw error;
  }
};
