package com.example.blogbackend.dtos;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;


@Data
public class UserDTO {

    private UUID id;
    private String lastName;
    private String firstName;
    private String email;
    private String password;
    private String imageUrl;
    private LocalDateTime createdAt;
    private String role;

}
