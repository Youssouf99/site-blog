import { Button, Card, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserById } from "../../api/userService";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const usersData = await getUserById(id);
        setUser(usersData);
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

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="flex justify-center items-center ">
      <Card className="p-6 max-w-lg w-full bg-white rounded-xl shadow-md space-y-4">
        <Typography variant="h4" className="text-center mb-4">
          Profil de l'utilisateur
        </Typography>
        {user ? (
          <>
            <Typography variant="body1">
              <strong>ID:</strong> {user.id}
            </Typography>
            <Typography variant="body1">
              <strong>Prénom:</strong> {user.firstName}
            </Typography>
            <Typography variant="body1">
              <strong>Nom:</strong> {user.lastName}
            </Typography>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="body1">
              <strong>Rôle:</strong> {user.role}
            </Typography>
            <Typography variant="body1">
              <strong>Date de création:</strong>{" "}
              {new Date(user.createdAt).toLocaleString()}
            </Typography>
            <div className="flex justify-between mt-4">
              <Link to={`/users/${id}/edit`} className="w-full mr-2">
                <Button variant="contained" color="blue" fullWidth>
                  Éditer
                </Button>
              </Link>
              <Link to={`/users/${id}/delete`} className="w-full ml-2">
                <Button variant="contained" color="red" fullWidth>
                  Supprimer
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <Typography variant="body1">Utilisateur non trouvé</Typography>
        )}
      </Card>
    </div>
  );
};

export default UserDetail;
