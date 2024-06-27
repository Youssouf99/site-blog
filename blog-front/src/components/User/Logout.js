import { Button } from "@material-tailwind/react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await axios.post(
          "/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <Button onClick={handleLogout} color="red">
      Se déconnecter
    </Button>
  );
};

export default Logout;
