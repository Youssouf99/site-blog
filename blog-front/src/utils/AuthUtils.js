import axios from "axios";
import { jwtDecode } from "jwt-decode";

const getUserIdFromToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.id; // Assurez-vous que votre token JWT contient un champ 'id'
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return null;
    }
  }
  return null;
};

const getCurrentUser = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }

    const response = await axios.get("/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error);
    return null;
  }
};

export { getUserIdFromToken, getCurrentUser };
