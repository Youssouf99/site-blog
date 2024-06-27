package com.example.blogbackend.dtos;

import com.example.blogbackend.entities.Article;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CommentDTO {

    private UUID id;
    private UUID articleId;
    private UUID authorId;
    private String content;
    private LocalDateTime createdAt;


}
