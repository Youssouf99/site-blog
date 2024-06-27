package com.example.blogbackend.controllers;

import com.example.blogbackend.dtos.AuthRequestDTO;
import com.example.blogbackend.entities.User;
import com.example.blogbackend.security.AuthService;
import com.example.blogbackend.services.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final AuthService authService;
    private final UserService userService;


    public AuthController(AuthenticationManager authenticationManager, AuthService authService, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.authService = authService;
        this.userService = userService;
    }


    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody AuthRequestDTO authRequestDTO) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequestDTO.email(), authRequestDTO.password())
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String token = authService.generateJwt(authRequestDTO.email()).get("bearer");
            return ResponseEntity.ok(Map.of("token", token));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authentication failed: " + e.getMessage());
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            authService.logout(jwtToken);
            return ResponseEntity.ok("Logout successful");
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }

    @PostMapping("/logoutCurrentUser")
    public ResponseEntity<String> logoutCurrentUser() {
        authService.logoutCurrentUser();
        return ResponseEntity.ok("Logout successful");
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Principal principal) {
        System.out.println("toot 1 : "+principal);
        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No user is currently authenticated");
        }
        System.out.println("toot : "+principal);
        User user = userService.findByEmail(principal.getName());
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token) {
        if (token != null && token.startsWith("Bearer ")) {
            String jwtToken = token.substring(7);
            boolean isValid = authService.validateToken(jwtToken);
            if (isValid) {
                return ResponseEntity.ok(Map.of("valid", true));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }
        }
        return ResponseEntity.badRequest().body("Invalid token");
    }


}
