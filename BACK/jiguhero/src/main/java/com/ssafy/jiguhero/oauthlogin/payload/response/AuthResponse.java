package com.ssafy.jiguhero.oauthlogin.payload.response;



import lombok.Builder;
import lombok.Data;

@Data
public class AuthResponse {

    private String accessToken;

    private String refreshToken;
    
    private String tokenType = "Bearer";

    public AuthResponse(){};

    @Builder
    public AuthResponse(String accessToken, String refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}
