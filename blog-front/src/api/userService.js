import axiosInstance from "../utils/axiosInstance";

const API_URL = "/users"; // Base URL for user endpoints

export const getAllUsers = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (userRequestDTO) => {
  try {
    const response = await axiosInstance.post(API_URL, userRequestDTO);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    await axiosInstance.delete(`${API_URL}/${userId}`);
  } catch (error) {
    throw error;
  }
};
