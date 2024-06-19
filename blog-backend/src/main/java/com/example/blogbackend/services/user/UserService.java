package com.example.blogbackend.services.user;

import com.example.blogbackend.dtos.UserDTO;
import com.example.blogbackend.dtos.UserRequestDTO;

import java.util.List;
import java.util.UUID;

public interface UserService {
    List<UserDTO> getAllUsers();

    UserDTO getUserById(UUID userId);

    UserDTO createUser(UserRequestDTO userRequestDTO);

    void deleteUser(UUID userId);
}
