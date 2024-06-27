import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  Drawer,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import React, { useCallback, useEffect, useState } from "react";
import TwitterChatboxTextarea from "./TwitterChatboxTextarea";
import { createComment, getCommentsByArticle } from "../../api/commentService";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { getCurrentUser } from "../../utils/AuthUtils";
import { getUserById } from "../../api/userService";

const CommentsDrawer = ({
  open,
  onClose,
  article,
  setCommentCount,
  isAuthenticated,
}) => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [authorImages, setAuthorImages] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    fetchUser();
  }, []);

  const fetchImageUrlByAuthorId = async (id) => {
    try {
      const userData = await getUserById(id);
      return userData.imageUrl;
    } catch (err) {
      console.error(
        "Erreur lors de la récupération des données de l'utilisateur.",
        err
      );
      return "";
    }
  };

  const fetchAuthorImages = useCallback(async (comments) => {
    const authorImagePromises = comments.map(async (comment) => {
      const imageUrl = await fetchImageUrlByAuthorId(comment.authorId);
      return { [comment.authorId]: imageUrl };
    });

    const authorImageArray = await Promise.all(authorImagePromises);
    const authorImageMap = Object.assign({}, ...authorImageArray);
    setAuthorImages(authorImageMap);
  }, []);

  const fetchComments = useCallback(async () => {
    try {
      if (article?.id) {
        const response = await getCommentsByArticle(article.id);
        setComments(response.data);
        setCommentCount(response.data.length);
        await fetchAuthorImages(response.data);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des commentaires :", error);
    }
  }, [article, setCommentCount, fetchAuthorImages]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        await createComment(user.id, article.id, newComment);
        setNewComment("");
        fetchComments();
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire :", error);
      }
    }
  };

  return (
    <Drawer open={open} onClose={onClose} className="p-4 bg-green-50">
      <div className="mb-6 flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          Commentaires
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={onClose}>
          <XMarkIcon className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="flex flex-col space-y-4 overflow-y-auto max-h-[80vh] lg:max-h-[70vh] md:max-h-[50vh] sm:max-h-[30vh]">
        {comments?.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="mb-4 bg-yellow-50">
              <CardBody>
                <Typography variant="body2">{comment.content}</Typography>
              </CardBody>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center -space-x-3">
                  <Tooltip content="Natali Craig">
                    <Avatar
                      size="sm"
                      variant="circular"
                      alt="natali craig"
                      src={
                        authorImages[comment.authorId] ||
                        "https://w7.pngwing.com/pngs/304/275/png-transparent-user-profile-computer-icons-profile-miscellaneous-logo-monochrome-thumbnail.png"
                      }
                      className="border-2 border-white hover:z-10"
                    />
                  </Tooltip>
                </div>

                <Typography
                  variant="caption"
                  color="blue-gray"
                  className="font-normal text-xs"
                >
                  {new Date(comment.createdAt).toLocaleString()}
                </Typography>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="blue-gray">
            Aucun commentaire pour cet article.
          </Typography>
        )}
      </div>

      {isAuthenticated && (
        <div className="mt-4">
          <TwitterChatboxTextarea
            value={newComment}
            onChange={handleNewCommentChange}
            onSubmit={handleAddComment}
          />
        </div>
      )}
    </Drawer>
  );
};

export default CommentsDrawer;
