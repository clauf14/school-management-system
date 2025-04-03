package com.unitbv.school_management_system.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "password_resets")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordReset {

    @Id
    @GeneratedValue
    private Integer resetId;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(unique = true, nullable = false)
    private String resetToken;

    @Column(nullable = false)
    private java.sql.Timestamp expiresAt;

    @Column(nullable = false, updatable = false)
    private java.sql.Timestamp createdAt;
}

