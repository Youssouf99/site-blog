import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button, Card, Typography } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ArticleDetail = ({ isAuthenticated }) => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement de l'article :", error);
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) return <div>Chargement...</div>;
  if (!article) return <div>Article non trouvé</div>;

  return (
    <Card className="p-4">
      <img
        src={article.imageUrl}
        alt="Article"
        className="w-full h-auto mt-4"
      />
      <div className="flex justify-between items-center">
        <Typography variant="h4" className="my-4">
          {article.title}
        </Typography>
        {isAuthenticated && (
          <div className="flex space-x-4">
            <Link to={`/blog/${id}/edit`}>
              <Button color="blue" className="flex items-center">
                <PencilIcon className="h-5 w-5 mr-2" />
              </Button>
            </Link>
            <Link to={`/blog/${id}/delete`}>
              <Button color="red" className="flex items-center">
                <TrashIcon className="h-5 w-5 mr-2" />
              </Button>
            </Link>
          </div>
        )}
      </div>
      <Typography variant="body">{article.content}</Typography>
    </Card>
  );
};

export default ArticleDetail;
