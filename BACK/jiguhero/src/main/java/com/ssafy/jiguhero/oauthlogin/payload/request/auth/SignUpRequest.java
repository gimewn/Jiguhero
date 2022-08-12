package com.ssafy.jiguhero.oauthlogin.payload.request.auth;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;


import lombok.Data;

@Data
public class SignUpRequest {
    
    @NotBlank
    private String name;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    private String password;
}
