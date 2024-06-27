package com.example.blogbackend.repositories;

import com.example.blogbackend.entities.Article;
import com.example.blogbackend.entities.Jwt;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface JwtRepository extends JpaRepository<Jwt, UUID> {
    Optional<Jwt> findByValue(String value);

    @Transactional
    @Modifying
    @Query("UPDATE Jwt j SET j.disabled = true, j.expire = true WHERE j.user.email = :userEmail")
    void disableJwtByUserEmail(String userEmail);

    @Transactional
    @Modifying
    @Query("DELETE FROM Jwt j WHERE j.disabled = true OR j.expire = true OR j.expirationDate < CURRENT_TIMESTAMP")
    void deleteInvalidTokens();

    void deleteByUserId(UUID userId);
}
