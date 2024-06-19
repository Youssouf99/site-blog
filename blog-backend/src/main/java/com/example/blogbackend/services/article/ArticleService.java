package com.example.blogbackend.services.article;

import com.example.blogbackend.dtos.ArticleDTO;
import com.example.blogbackend.dtos.ArticleRequestDTO;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface ArticleService {
    List<ArticleDTO> getAllArticles();

    ArticleDTO getArticleById(UUID id);

    ArticleDTO createArticle(UUID userId, Set<UUID> categoryIds, ArticleRequestDTO articleRequestDTO);

    void deletePublication(UUID id);
}
