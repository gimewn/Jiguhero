package com.ssafy.jiguhero.data.dto;



import com.ssafy.jiguhero.data.entity.type.AuthProvider;
import com.ssafy.jiguhero.exception.OAuth2AuthenticationProcessingException;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if (registrationId.equalsIgnoreCase(AuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } //else if (registrationId.equalsIgnoreCase(AuthProvider.naver.toString())) {
           //return new NaverOAuth2UserInfo(attributes);
        //} else if (registrationId.equalsIgnoreCase(AuthProvider.kakao.toString())) {
         //   return new KakaoOAuth2UserInfo(attributes);
        //}
        else {
            throw new OAuth2AuthenticationProcessingException("Unsupported Login Type : " + registrationId);
        }
    }

}
