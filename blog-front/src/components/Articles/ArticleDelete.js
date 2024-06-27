import { Button, Card, Typography } from "@material-tailwind/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteArticle } from "../../api/articleService";

const ArticleDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteArticle = async () => {
    try {
      await deleteArticle(id);
      navigate(-2); // Naviguer en arrière d'une page
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };

  const handleCancel = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <Card className="p-4 max-w-md mx-auto mt-6">
      <Typography variant="h4" className="mb-4 text-center">
        Supprimer l'article
      </Typography>
      <Typography className="mb-4 text-center">
        Êtes-vous sûr de vouloir supprimer cet article ?
      </Typography>
      <div className="flex space-x-4">
        <Button onClick={handleDeleteArticle} color="red" fullWidth>
          Supprimer
        </Button>
        <Button onClick={handleCancel} color="blue-gray" fullWidth>
          Annuler
        </Button>
      </div>
    </Card>
  );
};

export default ArticleDelete;
