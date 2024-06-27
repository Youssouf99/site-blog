package com.example.blogbackend.utils;

import com.example.blogbackend.entities.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    private final Key jwtSecretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256); // Generate a secure key
    private final int jwtExpirationMs = 3600000; // 1 hour

    public Map<String, String> generateJwt(User user) {
        final long currentTime = System.currentTimeMillis();
        final long expirationTime = currentTime + jwtExpirationMs;

        final Map<String, Object> claims = Map.of(
                "id", String.valueOf(user.getId()),
                "firstName", user.getFirstName(),
                "email", user.getEmail(),
                Claims.EXPIRATION, new Date(expirationTime),
                Claims.SUBJECT, user.getEmail()
        );

        final String bearer = Jwts.builder()
                .setIssuedAt(new Date(currentTime))
                .setExpiration(new Date(expirationTime))
                .setSubject(user.getEmail())
                .setClaims(claims)
                .signWith(jwtSecretKey, SignatureAlgorithm.HS256)
                .compact();
        return Map.of("bearer", bearer);
    }

    public boolean validateJwtToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(jwtSecretKey).build().parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public String getUsernameFromJwtToken(String token) {
        return getClaim(token, Claims::getSubject);
    }

    public boolean isTokenExpired(String token) {
        Date expirationDate = getClaim(token, Claims::getExpiration);
        return expirationDate.before(new Date());
    }

    private <T> T getClaim(String token, Function<Claims, T> function) {
        Claims claims = getAllClaims(token);
        return function.apply(claims);
    }

    private Claims getAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(jwtSecretKey)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }



}
