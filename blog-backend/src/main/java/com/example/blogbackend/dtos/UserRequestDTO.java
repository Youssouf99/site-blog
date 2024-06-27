package com.example.blogbackend.dtos;

import com.example.blogbackend.enums.Role;

public record UserRequestDTO (String lastName, String firstName, String email,
                              String imageUrl, String password, Role role) {

}
