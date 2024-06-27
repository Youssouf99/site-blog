import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Drawer } from "@material-tailwind/react";
import { PlusIcon } from "@heroicons/react/24/outline";
import ArticleForm from "./ArticleForm";
import {
  addFavorite,
  getAllArticlesPaged,
  getFavoriteArticlesByUser,
  removeFavorite,
} from "../../api/articleService";
import { getUserIdFromToken } from "../../utils/AuthUtils";

const ArticleList = ({ isAuthenticated }) => {
  const userId = getUserIdFromToken();
  const [articles, setArticles] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openRight, setOpenRight] = React.useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentSize, setCurrentSize] = useState(9);

  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const page = parseInt(searchParams.get("page")) || 0;
    const size = parseInt(searchParams.get("size")) || 9;

    setCurrentPage(page);
    setCurrentSize(size);
    const fetchArticles = async () => {
      try {
        const reponseArticle = await getAllArticlesPaged(
          currentPage,
          currentSize,
          "createdAt",
          "desc"
        );
        setTotalPages(reponseArticle.page.totalPages);
        if (reponseArticle["_embedded"]?.articleDTOList) {
          setArticles(reponseArticle["_embedded"].articleDTOList);
        } else {
          setArticles([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement des articles :", error);
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      try {
        const responseFavorites = await getFavoriteArticlesByUser(userId);
        setFavorites(responseFavorites?.map((article) => article.id));
      } catch (error) {
        console.error("Erreur lors du chargement des favoris :", error);
      }
    };

    fetchArticles();
    fetchFavorites();
  }, [userId, currentPage, currentSize, location.search]);

  const toggleFavorite = async (articleId) => {
    try {
      if (favorites.includes(articleId)) {
        await removeFavorite(userId, articleId);
        setFavorites(favorites.filter((id) => id !== articleId));
      } else {
        await addFavorite(userId, articleId);
        setFavorites([...favorites, articleId]);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris :", error);
    }
  };

  const openDrawerRight = () => {
    setOpenRight(true);
    navigate(`/blog/new`);
  };
  const closeDrawerRight = () => {
    setOpenRight(false);
    navigate(`/blog`);
  };

  const handleAddArticle = (newArticle) => {
    setArticles([newArticle, ...articles]);
    setOpenRight(false);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0) {
      setCurrentPage(pageNumber - 1);
    }

    navigate(`/blog?page=${pageNumber - 1}&size=${currentSize}`);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div>
      {isAuthenticated && (
        <div className="flex justify-between items-center mb-4 ">
          <Button
            onClick={openDrawerRight}
            variant="outlined"
            className="flex items-center gradient-background-1"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
          </Button>

          <Drawer
            placement="right"
            open={openRight}
            onClose={closeDrawerRight}
            className="p-4 bg-green-50"
          >
            <ArticleForm onAddArticle={handleAddArticle} />
          </Drawer>
        </div>
      )}
      <div className="grid gap-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            isFavorite={favorites.includes(article.id)}
            article={article}
            onToggleFavorite={() => toggleFavorite(article.id)}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {articles.length > 0 &&
          Array.from(Array(totalPages).keys()).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`mx-1 px-3 py-1 rounded ${
                pageNumber === currentPage
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
              onClick={() => handlePageChange(pageNumber + 1)}
            >
              {pageNumber + 1}
            </button>
          ))}
      </div>
    </div>
  );
};

export default ArticleList;
