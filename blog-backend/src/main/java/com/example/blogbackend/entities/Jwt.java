package com.example.blogbackend.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Jwt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String value;

    @Column(nullable = false)
    private boolean disabled;

    @Column(nullable = false)
    private boolean expire;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date expirationDate;

    @ManyToOne(cascade = {CascadeType.DETACH, CascadeType.MERGE})
    private User user;
}
