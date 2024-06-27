import { Button, Input, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/authService";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password); // Utilisation de la fonction d'authentification API mise à jour
      localStorage.setItem("token", response.token);
      setIsAuthenticated(true);
      setError("");
      navigate("/users");
    } catch (error) {
      setError("Authentification échouée. Veuillez vérifier vos identifiants.");
    }
  };

  return (
    <div className="justify-center items-center p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <Typography variant="h4" className="text-center">
        Connexion
      </Typography>
      {error && (
        <Typography color="red" className="text-center">
          {error}
        </Typography>
      )}
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        required
      />
      <Input
        type="password"
        label="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        required
      />
      <Button onClick={handleLogin} fullWidth color="gray" ripple="light">
        Se connecter
      </Button>
    </div>
  );
};

export default Login;
