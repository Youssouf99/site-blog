package com.example.blogbackend.security;

import com.example.blogbackend.entities.Jwt;
import com.example.blogbackend.entities.User;
import com.example.blogbackend.repositories.UserRepository;
import com.example.blogbackend.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;
    private final JwtService jwtService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService, JwtService jwtService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.jwtService = jwtService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = getJwtFromRequest(request);

        if (token != null && jwtUtil.validateJwtToken(token)) {
            String username = jwtUtil.getUsernameFromJwtToken(token);

            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                Jwt jwt = jwtService.findByValue(token).orElse(null);

                if (jwt != null && isValidToken(jwt, token, username)) {
                    setAuthentication(userDetails, request);
                }
            }
        }

        filterChain.doFilter(request, response);
    }

    public boolean isValidToken(Jwt jwt, String token, String username) {
        UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);

        return userDetails != null
                && !jwtUtil.isTokenExpired(token)
                && !jwt.isDisabled()
                && userDetails.getUsername().equals(username);

    }

    private void setAuthentication(UserDetails userDetails, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails, null, userDetails.getAuthorities());
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }



}
