import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserIdFromToken } from "../../utils/AuthUtils";
import { getAllCategories } from "../../api/categoryService";
import { createArticle } from "../../api/articleService";

const ArticleForm = ({ onAddArticle }) => {
  const userId = getUserIdFromToken();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [articleCreated, setArticleCreated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseCategory = await getAllCategories();
        setCategories(responseCategory);
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseArticle = await createArticle(userId, categoryId, {
        title,
        content,
        imageUrl,
      });
      onAddArticle(responseArticle);
      setArticleCreated(true);
      navigate("/blog");
    } catch (error) {
      setError("Échec de la création de l'article. Veuillez réessayer.");
    }
  };

  const handleCategoryChange = (value) => {
    setCategoryId(value);
  };

  return (
    <div className="p-6 max-w-sm mx-auto  rounded-xl space-y-4 bg-green-50">
      <Typography variant="h4" className="text-center">
        Nouvel Article
      </Typography>
      {error && <Typography color="red">{error}</Typography>}
      {articleCreated && (
        <Typography color="green" className="text-center">
          Article créé avec succès !
        </Typography>
      )}
      <Input
        type="text"
        label="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <Input
        type="textarea"
        label="Contenu"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
      />
      <Input
        type="text"
        label="Image Url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        fullWidth
      />
      <Select
        label="Catégories"
        multiple
        onChange={handleCategoryChange}
        fullWidth
      >
        {categories.map((category) => (
          <Option key={category.id} value={category.id}>
            {category.name}
          </Option>
        ))}
      </Select>
      <Button onClick={handleSubmit} fullWidth>
        Créer l'article
      </Button>
      <img
        src="https://www.shutterstock.com/shutterstock/photos/2466644459/display_1500/stock-photo-ai-technology-artificial-intelligence-chatbot-chat-and-talk-with-ai-using-laptop-for-search-and-2466644459.jpg"
        alt="Nouvel article"
        className="w-full h-auto mt-4"
      />
    </div>
  );
};

export default ArticleForm;
