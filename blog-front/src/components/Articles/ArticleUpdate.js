import { Button, Input, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ArticleUpdate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedContent, setUpdatedContent] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedContent(response.data.content);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de l'article :", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleUpdateArticle = async () => {
    try {
      const response = await axios.put(`/api/articles/${id}`, {
        title: updatedTitle,
        content: updatedContent,
      });
      setArticle(response.data);
      navigate(`/blog/${id}`);
    } catch (error) {
      setError(
        "Erreur lors de la mise à jour de l'article. Veuillez réessayer."
      );
      console.error(error);
    }
  };

  if (loading) return <div>Chargement...</div>;
  if (!article) return <div>Article non trouvé</div>;

  return (
    <div className="p-6 max-w-sm mx-auto  rounded-xl space-y-4 bg-green-50">
      <Typography variant="h4" className="my-4">
        Modifier l'article
      </Typography>
      {error && <Typography color="red">{error}</Typography>}
      <Input
        type="text"
        label="Titre"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        fullWidth
        className="mb-4"
      />
      <Input
        type="textarea"
        label="Contenu"
        value={updatedContent}
        onChange={(e) => setUpdatedContent(e.target.value)}
        fullWidth
        className="mb-4"
      />
      <Button onClick={handleUpdateArticle} fullWidth>
        Sauvegarder
      </Button>{" "}
    </div>
  );
};

export default ArticleUpdate;
