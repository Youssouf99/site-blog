package com.example.blogbackend.mappers;

import com.example.blogbackend.dtos.UserDTO;
import com.example.blogbackend.dtos.UserRequestDTO;
import com.example.blogbackend.entities.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDTO toUserDTO(User user);

    @Mapping(target = "articles", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    User toUser(UserDTO userDTO);
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "articles", ignore = true)
    @Mapping(target = "comments", ignore = true)
    @Mapping(target = "authorities", ignore = true)
    User toUser(UserRequestDTO userRequestDTO);
}
