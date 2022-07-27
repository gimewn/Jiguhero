package com.ssafy.jiguhero.data.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
public class SignUpRequest {
    @NotBlank
    private String name;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    private String password;
    // Getters and Setters (Omitted for brevity)


    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}