package com.ssafy.jiguhero.oauthlogin.config.security.auth;

import java.util.Map;

import com.ssafy.jiguhero.oauthlogin.advice.assertThat.DefaultAssert;
import com.ssafy.jiguhero.oauthlogin.config.security.auth.company.Google;
import com.ssafy.jiguhero.oauthlogin.config.security.auth.company.Kakao;
import com.ssafy.jiguhero.oauthlogin.config.security.auth.company.Naver;
import com.ssafy.jiguhero.oauthlogin.domain.entity.user.Provider;

public class OAuth2UserInfoFactory {
    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(Provider.google.toString())) {
            return new Google(attributes);
        } else if (registrationId.equalsIgnoreCase(Provider.naver.toString())) {
            return new Naver(attributes);
        } else if (registrationId.equalsIgnoreCase(Provider.kakao.toString())) {
            return new Kakao(attributes);
        } else {
            DefaultAssert.isAuthentication("해당 oauth2 기능은 지원하지 않습니다.");
        }
        return null;
    }
}
