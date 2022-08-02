package com.ssafy.jiguhero.oauthlogin.advice.error;

import java.util.List;

import com.ssafy.jiguhero.oauthlogin.advice.payload.ErrorCode;

import org.springframework.validation.Errors;
import org.springframework.validation.FieldError;

import lombok.Getter;

@Getter
public class InvalidParameterException extends DefaultException{

    private final Errors errors;

    public InvalidParameterException(Errors errors) {
        super(ErrorCode.INVALID_PARAMETER);
        this.errors = errors;
    }

    public List<FieldError> getFieldErrors() {
        return errors.getFieldErrors();
    }
    
}
