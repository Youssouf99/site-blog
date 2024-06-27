package com.example.blogbackend.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
public class ArticleDTO {

    private UUID id;
    private String title;
    private String content;
    private String imageUrl;
    private UUID authorId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
