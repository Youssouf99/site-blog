package com.example.blogbackend.mappers;

import com.example.blogbackend.dtos.ArticleDTO;

import com.example.blogbackend.dtos.ArticleRequestDTO;
import com.example.blogbackend.entities.Article;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ArticleMapper {

    @Mapping(source = "author.id", target = "authorId")
    ArticleDTO toArticleDTO(Article article);

    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(source = "authorId", target = "author.id")
    Article toUser(ArticleDTO articleDTO);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "categories", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "author", ignore = true)
    Article toUser(ArticleRequestDTO articleRequestDTO);

}
