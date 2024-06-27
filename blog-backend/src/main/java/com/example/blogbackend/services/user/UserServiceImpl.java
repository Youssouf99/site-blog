package com.example.blogbackend.services.user;

import com.example.blogbackend.dtos.UserDTO;
import com.example.blogbackend.dtos.UserRequestDTO;
import com.example.blogbackend.entities.User;
import com.example.blogbackend.exceptions.ResourceAlreadyExistsException;
import com.example.blogbackend.exceptions.ResourceNotFoundException;
import com.example.blogbackend.mappers.UserMapper;
import com.example.blogbackend.repositories.JwtRepository;
import com.example.blogbackend.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtRepository jwtRepository;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, PasswordEncoder passwordEncoder, JwtRepository jwtRepository) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtRepository = jwtRepository;
    }


    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll()
                .stream().map(userMapper::toUserDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserDTO getUserById(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id "+ userId));
        return userMapper.toUserDTO(user);
    }


    @Override
    public UserDTO createUser(UserRequestDTO userRequestDTO){
        if (userRepository.existsByEmail(userRequestDTO.email())){
            throw new ResourceAlreadyExistsException("User with email " + userRequestDTO.email() + " already exists");
        }

        User user = userMapper.toUser(userRequestDTO);
        user.setCreatedAt(LocalDateTime.now());
        user.setPassword(passwordEncoder.encode(userRequestDTO.password()));
        User savedUser = userRepository.save(user);
        return userMapper.toUserDTO(savedUser);

    }



    @Override
    @Transactional
    public void deleteUser(UUID userId) {
        jwtRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(()-> new ResourceNotFoundException("User Not Found"));
    }



}
