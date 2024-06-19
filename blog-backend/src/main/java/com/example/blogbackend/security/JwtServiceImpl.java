package com.example.blogbackend.security;

import com.example.blogbackend.entities.Jwt;
import com.example.blogbackend.repositories.JwtRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.UUID;


@Service
@Transactional
public class JwtServiceImpl implements JwtService {
    private final JwtRepository jwtRepository;

    public JwtServiceImpl(JwtRepository jwtRepository) {
        this.jwtRepository = jwtRepository;
    }

    @Override
    public Jwt saveJwt(Jwt jwt) {
        return jwtRepository.save(jwt);
    }
    @Override
    public Optional<Jwt> findByValue(String value) {
        return jwtRepository.findByValue(value);
    }
    @Override
    public void disableJwt(String value) {
        jwtRepository.findByValue(value).ifPresent(jwt -> {
            jwt.setDisabled(true);
            jwt.setExpire(true);
            jwtRepository.save(jwt);
        });
    }

    @Override
    public Optional<Jwt> findById(UUID id) {
        return jwtRepository.findById(id);
    }

    @Override
    public void deleteJwt(Jwt jwt) {
        jwtRepository.delete(jwt);
    }

    @Override
    public void deleteJwtById(UUID id) {
        jwtRepository.deleteById(id);
    }

    @Override
    public void disableJwtByUserEmail(String userEmail) {
        jwtRepository.disableJwtByUserEmail(userEmail);
    }

    @Scheduled(fixedRate = 3600000) // Exécution toutes les heures (3600000 ms = 1 heure)
    public void deleteInvalidTokens() {
        jwtRepository.deleteInvalidTokens();

    }

}
