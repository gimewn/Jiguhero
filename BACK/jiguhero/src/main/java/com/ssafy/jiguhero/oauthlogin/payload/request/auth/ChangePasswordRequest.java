package com.ssafy.jiguhero.oauthlogin.payload.request.auth;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


import lombok.Data;

@Data
public class ChangePasswordRequest {


    @NotBlank
    @NotNull
    private String oldPassword;


    @NotBlank
    @NotNull
    private String newPassword;


    @NotBlank
    @NotNull
    private String reNewPassword;

}
