import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../api/userService";

const UserCreate = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postUser = async () => {
      try {
        const usersData = await createUser(formData);
        setFormData(usersData);
        navigate("/users");
      } catch (err) {
        console.error(err);
      }
    };
    postUser();
  };
  return (
    <div className="flex justify-center items-center mx-auto max-w-screen-md py-12">
      <Card>
        <div className="p-8 space-y-4">
          <Typography variant="h4" color="indigo">
            Créer Utilisateur
          </Typography>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="firstName"
              label="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
              size="regular"
            />
            <Input
              name="lastName"
              label="Nom"
              value={formData.lastName}
              onChange={handleChange}
              required
              size="regular"
            />
            <Input
              name="email"
              type="email"
              label="Email"
              value={formData.email}
              onChange={handleChange}
              required
              size="regular"
            />
            <Input
              name="password"
              type="password"
              label="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
              size="regular"
            />

            <Select
              label="Rôle"
              value={formData.role}
              onChange={(value) => handleSelectChange(value)}
              fullWidth
            >
              <Option value="ROLE_USER">Utilisateur</Option>
              <Option value="ROLE_ADMIN">Administrateur</Option>
            </Select>
            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                color="indigo"
                buttonType="filled"
                size="regular"
                ripple="light"
              >
                Soumettre
              </Button>
              <Button
                color="gray"
                buttonType="outline"
                size="regular"
                ripple="light"
                onClick={() => navigate("/users")}
              >
                Annuler
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default UserCreate;
