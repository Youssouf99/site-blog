import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setIsAuthenticated }) => {
  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      await axios.post("/api/users", {
        lastName,
        firstName,
        email,
        password,
        role,
      });
      const loginResponse = await axios.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", loginResponse.data.token);
      setIsAuthenticated(true);
      setError("");
      navigate("/");
    } catch (error) {
      setError("Échec de l'inscription. Veuillez réessayer.");
    }
  };

  const handleCancel = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/users");
    }
  };

  return (
    <div className="justify-center items-center p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
      <Typography variant="h4" className="text-center">
        Inscription
      </Typography>
      {error && <Typography color="red">{error}</Typography>}
      <Input
        type="text"
        label="Nom"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        fullWidth
      />
      <Input
        type="text"
        label="Prénom"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        fullWidth
      />
      <Input
        type="email"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <Input
        type="password"
        label="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Input
        type="password"
        label="Confirmer le mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Select
        label="Rôle"
        value={role}
        onChange={(value) => setRole(value)}
        fullWidth
      >
        <Option value="ROLE_USER">Utilisateur</Option>
        <Option value="ROLE_ADMIN">Administrateur</Option>
      </Select>
      <div className="flex justify-end space-x-4">
        <Button onClick={handleSignup} fullWidth>
          S'inscrire
        </Button>
        <Button color="gray" variant="outline" onClick={handleCancel} fullWidth>
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default Signup;
