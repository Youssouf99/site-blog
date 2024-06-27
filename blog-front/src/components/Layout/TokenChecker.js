import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenChecker = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          await axios.get("/api/auth/validate-token", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Invalid token, logging out...", err);
          setIsAuthenticated(false);
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    checkTokenValidity();
  }, [navigate, setIsAuthenticated]);

  return null;
};

export default TokenChecker;
