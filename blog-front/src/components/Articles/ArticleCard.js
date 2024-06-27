import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/16/solid";
import { ChevronDoubleRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CommentsDrawer from "./CommentsDrawer";

const ArticleCard = ({
  article,
  isFavorite,
  onToggleFavorite,
  isAuthenticated,
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const previousUrl = useRef(null);

  const openCommentsDrawer = () => {
    previousUrl.current = location.pathname + location.search;
    setOpenDrawer(true);
    const params = new URLSearchParams(location.search);
    const page = params.get("page");
    const size = params.get("size");
    navigate(`/blog/${article?.id}/comments?page=${page}&size=${size}`, {
      replace: true,
    });
  };

  const closeCommentsDrawer = () => {
    setOpenDrawer(false);
    if (previousUrl.current) {
      navigate(previousUrl.current);
    } else {
      navigate(`/blog`);
    }
  };

  return (
    <Card className="mt-6 w-full bg-cyan-50	">
      <CardHeader color="blue-gray" className="relative h-56">
        <img
          src={article?.imageUrl}
          alt="Article"
          className="w-full h-full object-cover"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/10 " />
        <IconButton
          size="sm"
          onClick={onToggleFavorite}
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          {isFavorite ? (
            <HeartIcon className="h-6 w-6 text-red-500" />
          ) : (
            <HeartIcon className="h-6 w-6 text-white" />
          )}
        </IconButton>
      </CardHeader>
      <CardBody>
        <Typography variant="h5" className="mb-2">
          {article.title}
        </Typography>
        <Typography>{article.content.substring(0, 100)}...</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <div className="flex justify-between items-center">
          <Link to={`/blog/${article.id}`}>
            <ChevronDoubleRightIcon className="h-4 w-4 ml-1" />
          </Link>
          <Typography
            variant="caption"
            className="font-normal text-xs text-black"
          >
            {new Date(article.createdAt).toLocaleString()}
          </Typography>
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <IconButton
              className="ml-2"
              onClick={openCommentsDrawer}
              color="blue-gray"
              variant="text"
            >
              <Badge content={commentCount} withBorder color="gray">
                <ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />
              </Badge>
            </IconButton>
          </div>
        </div>
      </CardFooter>
      <CommentsDrawer
        open={openDrawer}
        onClose={closeCommentsDrawer}
        article={article}
        setCommentCount={setCommentCount}
        isAuthenticated={isAuthenticated}
      />
    </Card>
  );
};

export default ArticleCard;
