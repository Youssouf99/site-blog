package com.example.blogbackend.mappers;

import com.example.blogbackend.dtos.CommentDTO;
import com.example.blogbackend.entities.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(source = "article.id", target = "articleId")
    @Mapping(source = "author.id", target = "authorId")
    CommentDTO toCommentDTO(Comment comment);



}
