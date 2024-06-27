package com.example.blogbackend.controllers;

import com.example.blogbackend.dtos.CommentDTO;
import com.example.blogbackend.services.comment.CommentService;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public CommentDTO createComment(
            @RequestParam UUID userId,
            @RequestParam UUID articleId,
            @RequestParam String content) {

        return commentService.createComment(articleId, userId, content);

    }

    @GetMapping("/{commentId}")
    public CommentDTO getCommentById(@PathVariable UUID commentId) {
        return commentService.getCommentById(commentId);
    }

    @PutMapping("/{commentId}")
    public void updateComment(@PathVariable UUID commentId, @RequestParam String content) {
        commentService.updateComment(commentId, content);
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable UUID commentId) {
        commentService.deleteComment(commentId);
    }

    @GetMapping("/article/{articleId}")
    public Set<CommentDTO> getCommentsByArticle(@PathVariable UUID articleId) {
        return commentService.getCommentsByArticle(articleId);
    }

    @GetMapping("")
    public Set<CommentDTO> getAllComments() {
        return commentService.getAllComments();
    }



}
