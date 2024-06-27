package com.example.blogbackend.controllers;

import com.example.blogbackend.dtos.ArticleDTO;
import com.example.blogbackend.dtos.ArticleRequestDTO;
import com.example.blogbackend.services.article.ArticleService;
import org.springframework.data.domain.Page;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public ResponseEntity<Set<ArticleDTO>> getAllArticles() {
        Set<ArticleDTO> articleDTOS = articleService.getAllArticles();
        return new ResponseEntity<>(articleDTOS, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ArticleDTO> getArticleById(@PathVariable UUID id) {
        ArticleDTO articleDTO = articleService.getArticleById(id);
        return new ResponseEntity<>(articleDTO, HttpStatus.OK);
    }

    @PostMapping("/{userId}")
    public ResponseEntity<ArticleDTO> createPublication(@PathVariable UUID userId,
                                                            @RequestParam Set<UUID> categoryIds,
                                                            @RequestBody ArticleRequestDTO articleRequestDTO) {
        ArticleDTO articleDTO = articleService.createArticle(userId, categoryIds, articleRequestDTO);
        return new ResponseEntity<>(articleDTO, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePublication(@PathVariable UUID id) {
        articleService.deletePublication(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/{userId}/favorites/{articleId}")
    public ResponseEntity<Void> addFavorite(@PathVariable UUID userId, @PathVariable UUID articleId) {
        articleService.addFavorite(userId, articleId);
        return ResponseEntity.ok().build();
    }
    @DeleteMapping("/{userId}/favorites/{articleId}")
    public ResponseEntity<Void> removeFavorite(@PathVariable UUID userId, @PathVariable UUID articleId) {
        articleService.removeFavorite(userId, articleId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{userId}/favorites")
    public ResponseEntity<List<ArticleDTO>> getFavoriteArticlesByUser(@PathVariable UUID userId) {
        List<ArticleDTO> favoriteArticles = articleService.getFavoriteArticlesByUser(userId);
        return ResponseEntity.ok(favoriteArticles);
    }


    @GetMapping("/paged")
    public ResponseEntity<PagedModel<ArticleDTO>> getAllArticlesPaged(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String[] sort,
            @RequestParam(defaultValue = "desc") String order) {

        Page<ArticleDTO> articlesPage = articleService.getAllArticlesPaged(page, size, sort, order);
        PagedModel<ArticleDTO> pagedModel = PagedModel.of(articlesPage.getContent(),
                new PagedModel.PageMetadata(articlesPage.getSize(),
                        articlesPage.getNumber(),
                        articlesPage.getTotalElements()));

        return ResponseEntity.ok().body(pagedModel);
    }




}
