import { Button, Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArticleDelete = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDeleteArticle = async () => {
    try {
      await axios.delete(`/api/articles/${id}`);
      navigate("/blog");
    } catch (error) {
      console.error("Erreur lors de la suppression de l'article :", error);
    }
  };
  return (
    <Card className="p-4">
      <Typography variant="h4" className="my-4">
        Supprimer l'article
      </Typography>
      <Typography className="my-4">
        Êtes-vous sûr de vouloir supprimer cet article ?
      </Typography>
      <Button onClick={handleDeleteArticle} color="red" fullWidth>
        Supprimer
      </Button>
      <Button onClick={() => navigate(`/blog/${id}`)} fullWidth>
        Annuler
      </Button>
    </Card>
  );
};

export default ArticleDelete;
