import axiosInstance from "../utils/axiosInstance";

const API_URL = "/articles"; // L'URL de base pour les endpoints des articles

export const getAllArticles = async () => {
  try {
    const response = await axiosInstance.get(API_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getArticleById = async (articleId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${articleId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createArticle = async (userId, categoryIds, articleRequestDTO) => {
  try {
    const response = await axiosInstance.post(
      `${API_URL}/${userId}`,
      articleRequestDTO,
      {
        params: { categoryIds },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteArticle = async (articleId) => {
  try {
    await axiosInstance.delete(`${API_URL}/${articleId}`);
  } catch (error) {
    throw error;
  }
};

export const addFavorite = async (userId, articleId) => {
  try {
    await axiosInstance.post(`${API_URL}/${userId}/favorites/${articleId}`);
  } catch (error) {
    throw error;
  }
};

export const removeFavorite = async (userId, articleId) => {
  try {
    await axiosInstance.delete(`${API_URL}/${userId}/favorites/${articleId}`);
  } catch (error) {
    throw error;
  }
};

export const getFavoriteArticlesByUser = async (userId) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/${userId}/favorites`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllArticlesPaged = async (page, size, sort, order) => {
  try {
    const response = await axiosInstance.get(`${API_URL}/paged`, {
      params: { page, size, sort, order },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
