import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteUser } from "../../api/userService";

const UserDelete = () => {
  const { id, firstName, lastName } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      navigate("/users");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      <Card className="max-w-md w-full">
        <CardBody>
          {id ? (
            <>
              <Typography variant="h4" className="text-center mb-4">
                Supprimer l'utilisateur
              </Typography>
              <Typography variant="body1" className="text-center mb-6">
                Êtes-vous sûr de vouloir supprimer {firstName} {lastName} ?{" "}
              </Typography>
              <div className="flex justify-between">
                <Button
                  variant="contained"
                  color="red"
                  onClick={handleDelete}
                  className="flex-1 mr-2"
                >
                  Oui, supprimer
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/users/${id}`)}
                  className="flex-1 ml-2"
                >
                  Non, revenir
                </Button>
              </div>
            </>
          ) : (
            <Typography variant="body1" className="text-center">
              Utilisateur introuvable.
            </Typography>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default UserDelete;
