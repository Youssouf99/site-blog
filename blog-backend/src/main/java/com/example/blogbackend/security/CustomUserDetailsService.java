package com.example.blogbackend.security;

import com.example.blogbackend.dtos.UserDTO;
import com.example.blogbackend.entities.User;
import com.example.blogbackend.exceptions.ResourceNotFoundException;
import com.example.blogbackend.mappers.UserMapper;
import com.example.blogbackend.repositories.UserRepository;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class CustomUserDetailsService implements UserDetailsService {


    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public CustomUserDetailsService(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + username));

        //UserDTO userDTO = userMapper.toUserDTO(user);


        return user;
    }
}
