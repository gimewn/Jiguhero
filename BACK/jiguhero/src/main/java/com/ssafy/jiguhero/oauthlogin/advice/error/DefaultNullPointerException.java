package com.ssafy.jiguhero.oauthlogin.advice.error;

import com.ssafy.jiguhero.oauthlogin.advice.payload.ErrorCode;

import lombok.Getter;

@Getter
public class DefaultNullPointerException extends NullPointerException{
    
    private ErrorCode errorCode;

    public DefaultNullPointerException(ErrorCode errorCode) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }
}
