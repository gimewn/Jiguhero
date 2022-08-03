package com.ssafy.jiguhero.oauthlogin.payload.request.auth;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;



import lombok.Builder;
import lombok.Data;

@Data
public class RefreshTokenRequest {

    @NotBlank
    @NotNull
    private String refreshToken;

    public RefreshTokenRequest(){}

    @Builder
    public RefreshTokenRequest(String refreshToken){
        this.refreshToken = refreshToken;
    }
}
