import axios from "axios";

const API_URL = "/api/comments";

// Création d'une instance d'axios avec configuration de l'intercepteur
const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Ajouter un intercepteur pour inclure le token JWT dans les headers de chaque requête
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

export const createComment = (userId, articleId, content) => {
  return axiosInstance.post("", null, {
    params: { userId, articleId, content },
  });
};
export const getCommentById = (commentId) => {
  return axiosInstance.get(`/${commentId}`);
};

export const updateComment = (commentId, content) => {
  return axiosInstance.put(`/${commentId}`, { content });
};

export const deleteComment = (commentId) => {
  return axiosInstance.delete(`/${commentId}`);
};

export const getCommentsByArticle = (articleId) => {
  return axiosInstance.get(`/article/${articleId}`);
};
