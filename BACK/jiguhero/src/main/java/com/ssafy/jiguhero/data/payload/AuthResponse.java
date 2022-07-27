package com.ssafy.jiguhero.data.payload;

public class AuthResponse {
    private String accessToken;
    private String tokenType = "Bearer";
    public AuthResponse(String accessToken) {
        this.accessToken = accessToken;
    }
    // Getters and Setters (Omitted for brevity)


    public String getAccessToken() {
        return accessToken;
    }

    public String getTokenType() {
        return tokenType;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public void setTokenType(String tokenType) {
        this.tokenType = tokenType;
    }
}