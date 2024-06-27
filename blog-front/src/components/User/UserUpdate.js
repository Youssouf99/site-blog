import { Button, Card, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById } from "../../api/userService";

const UserUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersData = await getUserById(id);
        setFormData(usersData);
        setLoading(false);
      } catch (err) {
        setError(
          "Erreur lors de la récupération des données de l'utilisateur."
        );
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios
      .put(`/api/users/${id}`, formData)
      .then((response) => {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/users/${response.data.id}`);
        }, 2000);
      })
      .catch((error) => {
        console.error(error);
        setError("Error updating user data.");
      });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center ">
      <Card className="p-6 max-w-lg w-full bg-white rounded-xl shadow-md space-y-4">
        <Typography variant="h4" className="text-center mb-4">
          Update User
        </Typography>
        {error && <Typography color="red">{error}</Typography>}
        {success && (
          <Typography color="green">User updated successfully!</Typography>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            fullWidth
          />
          <Input
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            fullWidth
          />
          <Input
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <Input
            name="password"
            type="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            required
            fullWidth
          />
          <Input
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
            required
            fullWidth
          />
          <Button type="submit" variant="contained" color="blue" fullWidth>
            Submit
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UserUpdate;
