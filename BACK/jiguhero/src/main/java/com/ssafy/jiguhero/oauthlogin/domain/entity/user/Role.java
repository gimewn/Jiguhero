package com.ssafy.jiguhero.oauthlogin.domain.entity.user;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum Role {
    ADMIN("ROLE_ADMIN"),
    USER("ROLE_USER"),
    REGISTER("ROLE_REGISTER"),
    DELETED("ROLE_DELETED");

    private String value;
}