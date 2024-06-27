package com.example.blogbackend.services.comment;

import com.example.blogbackend.dtos.CommentDTO;
import com.example.blogbackend.entities.Comment;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface CommentService {
    CommentDTO createComment(UUID articleId, UUID userId, String content);

    CommentDTO getCommentById(UUID commentId);

    void deleteComment(UUID commentId);

    void updateComment(UUID commentId, String content);

    Set<CommentDTO> getCommentsByArticle(UUID articleId);

    Set<CommentDTO> getAllComments();
}
