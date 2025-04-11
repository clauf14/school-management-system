package com.unitbv.school_management_system.authdtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SignUpDto {

    private String firstName;

    private String lastName;

    private String username;

    private String email;

    private String login;

    private String phoneNumber;

    private char[] password;


}
