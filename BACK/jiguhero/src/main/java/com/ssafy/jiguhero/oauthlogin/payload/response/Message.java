package com.ssafy.jiguhero.oauthlogin.payload.response;


import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@ToString
@Data
public class Message {

    private String message;

    public Message(){};

    @Builder
    public Message(String message) {
        this.message = message;
    }
}
