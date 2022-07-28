package com.ssafy.jiguhero.security.oauth2.user;

import com.ssafy.jiguhero.data.entity.AuthProvider;
import com.ssafy.jiguhero.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        System.err.println(attributes);
        switch (AuthProvider.valueOf(registrationId.toLowerCase())) {

            case google:
                return new GoogleOAuth2UserInfo(attributes);

            default:
                throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}