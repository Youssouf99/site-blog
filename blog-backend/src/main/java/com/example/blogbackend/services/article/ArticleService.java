package com.example.blogbackend.services.article;

import com.example.blogbackend.dtos.ArticleDTO;
import com.example.blogbackend.dtos.ArticleRequestDTO;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Set;
import java.util.UUID;

public interface ArticleService {
    Set<ArticleDTO> getAllArticles();

    Page<ArticleDTO> getAllArticlesPaged(int page, int size, String[] sort, String order);
    ArticleDTO getArticleById(UUID id);

    ArticleDTO createArticle(UUID userId, Set<UUID> categoryIds, ArticleRequestDTO articleRequestDTO);

    void deletePublication(UUID id);

    void addFavorite(UUID userId, UUID articleId);

    void removeFavorite(UUID userId, UUID articleId);

    List<ArticleDTO> getFavoriteArticlesByUser(UUID userId);
}
