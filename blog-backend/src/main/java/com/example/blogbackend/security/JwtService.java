package com.example.blogbackend.security;


import com.example.blogbackend.entities.Jwt;

import java.util.Optional;
import java.util.UUID;

public interface JwtService {

    Jwt saveJwt(Jwt jwt);

    Optional<Jwt> findByValue(String value);

    void disableJwt(String value);

    Optional<Jwt> findById(UUID id);

    void deleteJwt(Jwt jwt);

    void deleteJwtById(UUID id);

    void disableJwtByUserEmail(String userEmail);
}
