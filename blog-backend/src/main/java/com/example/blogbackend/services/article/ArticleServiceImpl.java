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
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
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
    public List<ArticleDTO> getAllArticles(){
        return articleRepository.findAll().stream()
                .map(articleMapper::toArticleDTO)
                .collect(Collectors.toList());
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
        Article savedArticle = articleRepository.save(article);
        return articleMapper.toArticleDTO(savedArticle);

    }

    @Override
    public void deletePublication(UUID id) {
        articleRepository.deleteById(id);
    }


}
