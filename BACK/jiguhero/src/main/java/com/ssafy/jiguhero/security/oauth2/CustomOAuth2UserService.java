package com.ssafy.jiguhero.security.oauth2;

import com.ssafy.jiguhero.data.entity.AuthProvider;
import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.UserRepository;
import com.ssafy.jiguhero.exception.OAuth2AuthenticationProcessingException;
import com.ssafy.jiguhero.security.UserPrincipal;
import com.ssafy.jiguhero.security.oauth2.user.OAuth2UserInfo;
import com.ssafy.jiguhero.security.oauth2.user.OAuth2UserInfoFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            System.out.println("-------------------로그인 체크용 : ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ");
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {

        final String registrationId = oAuth2UserRequest.getClientRegistration().getRegistrationId();

        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(registrationId, oAuth2User.getAttributes());

        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        System.out.println("-------------------로그인 체크용 : [로그인 하는 사용자 이메일 정보] "+oAuth2UserInfo.getEmail()); //////////////////////////////////////////////////////////////////////
        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;

        System.out.println("-------------------로그인 체크용 : [userOptional 정보] "+userOptional);
        // 이미 존재하는 경우
        if(userOptional.isPresent()) {
            user = userOptional.get();

            // 가져온 유저의 공급자명과 넘어온 공급자명이 다른 경우
            if(!user.getProvider().equals(AuthProvider.valueOf(registrationId))) {

                // 이미 다른 공급자가 존재하기 때문에 가입할 수 없다
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            System.out.println("-------------------로그인 체크용 : 가입 정보 있는 사용자면 이 문장 출력");
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            //user = updateExistingUser(user, oAuth2UserInfo);
            ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
            System.out.println("-------------------로그인 체크용 : 가입 정보 없는 사용자면 이 문장 출력");
        }

        System.out.println("-------------------로그인 체크용 : 로그인 체크 종료");
        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {

        User user = User.socialBuilder()
                .provider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))
                .providerId(oAuth2UserInfo.getId())
                .name(oAuth2UserInfo.getName())
                .email(oAuth2UserInfo.getEmail())
                .imageUrl(oAuth2UserInfo.getImageUrl())
                .build();

        return userRepository.save(user);
    }

    /*
    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.updateNameAndImage(oAuth2UserInfo.getName(), oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }

     */
}