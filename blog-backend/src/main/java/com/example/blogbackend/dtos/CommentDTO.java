package com.example.blogbackend.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class CommentDTO {

    private UUID id;
    private UUID authorId;
    private String content;
    private LocalDateTime createdAt;
    private UUID parentCommentId;


}
