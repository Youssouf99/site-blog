package com.example.blogbackend.repositories;

import com.example.blogbackend.entities.Article;
import com.example.blogbackend.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CommentRepository extends JpaRepository<Comment, UUID> {
    List<Comment> findByArticle(Article article);
}
