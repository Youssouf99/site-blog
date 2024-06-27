package com.example.blogbackend.services.article;

import com.example.blogbackend.dtos.ArticleDTO;
import com.example.blogbackend.dtos.ArticleRequestDTO;
import com.example.blogbackend.entities.Article;
import com.example.blogbackend.entities.Category;
import com.example.blogbackend.entities.User;
import com.example.blogbackend.exceptions.ResourceNotFoundException;
import com.example.blogbackend.mappers.ArticleMapper;
import com.example.blogbackend.repositories.ArticleRepository;
import com.example.blogbackend.repositories.CategoryRepository;
import com.example.blogbackend.repositories.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {

    private final ArticleRepository articleRepository;
    private final ArticleMapper articleMapper;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    public ArticleServiceImpl(ArticleRepository articleRepository, ArticleMapper articleMapper, UserRepository userRepository, CategoryRepository categoryRepository) {
        this.articleRepository = articleRepository;
        this.articleMapper = articleMapper;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Set<ArticleDTO> getAllArticles() {
        return articleRepository.findAll().stream()
                .sorted(Comparator.comparing(Article::getCreatedAt))
                .map(articleMapper::toArticleDTO)
                .collect(Collectors.toSet());
    }

    @Override
    public Page<ArticleDTO> getAllArticlesPaged(int page, int size, String[] sort, String order) {
        String sortBy = "createdAt"; // Valeur par défaut
        String sortOrder = "desc";   // Valeur par défaut

        if (sort != null && sort.length > 0) {
            sortBy = sort[0]; // Champ sur lequel trier
        }

        if ("asc".equalsIgnoreCase(order)) {
            sortOrder = "asc";
        }

        Sort.Direction direction = sortOrder.equalsIgnoreCase("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, direction, sortBy);

        Page<Article> articlesPage = articleRepository.findAll(pageable);
        return articlesPage.map(articleMapper::toArticleDTO);
    }


    @Override
    public ArticleDTO getArticleById(UUID id) {
        Article article = articleRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
        return articleMapper.toArticleDTO(article);
    }

    @Override
    public ArticleDTO createArticle(UUID userId, Set<UUID> categoryIds, ArticleRequestDTO articleRequestDTO) {

        User author = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        Set<Category> categories = new HashSet<>(categoryRepository.findAllById(categoryIds));
        if (categories.size() != categoryIds.size()) {
            throw new ResourceNotFoundException("One or more categories not found");
        }

        Article article = articleMapper.toUser(articleRequestDTO);
        article.setAuthor(author);
        article.setCategories(categories);
        article.setCreatedAt(LocalDateTime.now());
        article.setUpdatedAt(LocalDateTime.now());
        Article savedArticle = articleRepository.save(article);
        return articleMapper.toArticleDTO(savedArticle);

    }

    @Override
    public void deletePublication(UUID id) {
        articleRepository.deleteById(id);
    }

    @Override
    public void addFavorite(UUID userId, UUID articleId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
        Article article = articleRepository.findById(articleId).orElseThrow(() -> new ResourceNotFoundException("Article not found"));
        user.getFavorites().add(article);
        userRepository.save(user);

    }

    @Override
    public void removeFavorite(UUID userId, UUID articleId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
        Article article = articleRepository.findById(articleId).orElseThrow(() -> new IllegalArgumentException("Article not found"));

        user.getFavorites().remove(article);
        userRepository.save(user);
    }

    @Override
    public List<ArticleDTO> getFavoriteArticlesByUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return user.getFavorites().stream()
                .map(articleMapper::toArticleDTO)
                .collect(Collectors.toList());
    }



}
