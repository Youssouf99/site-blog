package com.example.blogbackend.services.comment;

import com.example.blogbackend.dtos.CommentDTO;
import com.example.blogbackend.entities.Article;
import com.example.blogbackend.entities.Comment;
import com.example.blogbackend.entities.User;
import com.example.blogbackend.exceptions.ResourceNotFoundException;
import com.example.blogbackend.mappers.CommentMapper;
import com.example.blogbackend.repositories.ArticleRepository;
import com.example.blogbackend.repositories.CommentRepository;
import com.example.blogbackend.repositories.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {
    private final CommentRepository commentRepository;
    private final ArticleRepository articleRepository;
    private final UserRepository userRepository;
    private final CommentMapper commentMapper;


    public CommentServiceImpl(CommentRepository commentRepository, ArticleRepository articleRepository, UserRepository userRepository, CommentMapper commentMapper) {
        this.commentRepository = commentRepository;
        this.articleRepository = articleRepository;
        this.userRepository = userRepository;
        this.commentMapper = commentMapper;
    }
    @Override
    public CommentDTO createComment(UUID articleId, UUID userId, String content) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
        User author = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Comment comment = new Comment();
        comment.setArticle(article);
        comment.setAuthor(author);
        comment.setContent(content);
        comment.setCreatedAt(LocalDateTime.now());

        return commentMapper.toCommentDTO(commentRepository.save(comment));
    }

    @Override
    public CommentDTO getCommentById(UUID commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));
        return commentMapper.toCommentDTO(comment);
    }

    @Override
    public void deleteComment(UUID commentId) {
        commentRepository.deleteById(commentId);
    }

    @Override
    public void updateComment(UUID commentId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ResourceNotFoundException("Comment not found"));

        comment.setContent(content);
        commentRepository.save(comment);
    }

    @Override
    public Set<CommentDTO> getCommentsByArticle(UUID articleId) {
        Article article = articleRepository.findById(articleId)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
        List<Comment> comments = commentRepository.findByArticle(article);
        return comments.stream()
                .sorted((c1, c2) -> c2.getCreatedAt().compareTo(c1.getCreatedAt()))
                .map(commentMapper::toCommentDTO)
                .collect(Collectors.toCollection(LinkedHashSet::new));
    }

    @Override
    public Set<CommentDTO> getAllComments() {
        return commentRepository.findAll().stream()
                .map(commentMapper::toCommentDTO)
                .collect(Collectors.toSet());
    }


}
