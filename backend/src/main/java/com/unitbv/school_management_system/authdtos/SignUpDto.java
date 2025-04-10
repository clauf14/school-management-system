package com.unitbv.school_management_system.authdtos;

import com.unitbv.school_management_system.entities.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDto {

    private String username;
    private String email;
    private Role role;
    private String token;
    private java.sql.Timestamp createdAt;
    private char[] password;

    public enum Role {
        TEACHER, STUDENT
    }

}
