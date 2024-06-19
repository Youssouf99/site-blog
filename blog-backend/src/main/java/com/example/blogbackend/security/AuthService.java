package com.example.blogbackend.security;

import java.util.Map;

public interface AuthService {
    Map<String, String> generateJwt(String email);

    void logout(String token);

    void logoutCurrentUser();
}
