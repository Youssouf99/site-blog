package com.example.blogbackend.security;


import com.example.blogbackend.entities.Jwt;
import com.example.blogbackend.entities.User;
import com.example.blogbackend.utils.JwtUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Map;

@Service
@Transactional
public class AuthServiceImpl implements AuthService{
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtService jwtService;
    private final JwtUtil jwtUtil;



    public AuthServiceImpl(CustomUserDetailsService customUserDetailsService, JwtService jwtService, JwtUtil jwtUtil) {
        this.customUserDetailsService = customUserDetailsService;
        this.jwtService = jwtService;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Map<String, String> generateJwt(String email) {
        User user = (User) customUserDetailsService.loadUserByUsername(email);
        Map<String, String> jwtMap = jwtUtil.generateJwt(user);
        Jwt jwt = Jwt.builder()
                .value(jwtMap.get("bearer"))
                .disabled(false)
                .expire(false)
                .expirationDate(new Date())
                .user(user)
                .build();
        jwtService.saveJwt(jwt);
        return jwtMap;
    }

    @Override
    public boolean validateToken(String token) {
        return jwtUtil.validateJwtToken(token);
    }


    @Override
    public void logout(String token) {
        jwtService.disableJwt(token);
    }

    @Override
    public void logoutCurrentUser() {
        String email =  SecurityContextHolder.getContext().getAuthentication().getName();
        jwtService.disableJwtByUserEmail(email);
    }

}
