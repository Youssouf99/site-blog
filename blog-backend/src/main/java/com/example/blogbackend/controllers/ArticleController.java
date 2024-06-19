package com.example.blogbackend.controllers;

import com.example.blogbackend.dtos.ArticleDTO;
import com.example.blogbackend.dtos.ArticleRequestDTO;
import com.example.blogbackend.entities.Article;
import com.example.blogbackend.services.article.ArticleService;
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
    public ResponseEntity<List<ArticleDTO>> getAllArticles() {
        List<ArticleDTO> articleDTOS = articleService.getAllArticles();
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

}
