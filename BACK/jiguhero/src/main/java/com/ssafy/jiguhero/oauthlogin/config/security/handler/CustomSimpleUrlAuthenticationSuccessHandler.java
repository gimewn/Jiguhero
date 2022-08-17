package com.ssafy.jiguhero.oauthlogin.config.security.handler;

import com.ssafy.jiguhero.data.dto.UserDto;
import com.ssafy.jiguhero.data.repository.UserRepository;
import com.ssafy.jiguhero.oauthlogin.advice.assertThat.DefaultAssert;
import com.ssafy.jiguhero.oauthlogin.config.security.OAuth2Config;
import com.ssafy.jiguhero.oauthlogin.config.security.util.CustomCookie;
import com.ssafy.jiguhero.oauthlogin.domain.entity.user.Role;
import com.ssafy.jiguhero.oauthlogin.domain.entity.user.Token;
import com.ssafy.jiguhero.oauthlogin.domain.mapping.TokenMapping;
import com.ssafy.jiguhero.oauthlogin.repository.auth.CustomAuthorizationRequestRepository;
import com.ssafy.jiguhero.oauthlogin.repository.auth.TokenRepository;
import com.ssafy.jiguhero.oauthlogin.service.auth.CustomTokenProviderService;

import com.ssafy.jiguhero.service.UserService;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import lombok.RequiredArgsConstructor;

import static com.ssafy.jiguhero.oauthlogin.repository.auth.CustomAuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;

import java.io.IOException;
import java.net.URI;
import java.util.Optional;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RequiredArgsConstructor
@Component
public class CustomSimpleUrlAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{

    private final CustomTokenProviderService customTokenProviderService;
    private final OAuth2Config oAuth2Config;
    private final TokenRepository tokenRepository;
    private final CustomAuthorizationRequestRepository customAuthorizationRequestRepository;
    private final UserService userService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        DefaultAssert.isAuthentication(!response.isCommitted());

        // Token 생성
        TokenMapping tokenMapping = customTokenProviderService.createToken(authentication);

        String targetUrl = determineTargetUrl(request, response, authentication, tokenMapping);

        clearAuthenticationAttributes(request, response);

        // Cookie 생성
        Cookie cookie = new Cookie("refreshToken", tokenMapping.getRefreshToken());
        // 만료기한 : 30일
        cookie.setMaxAge(30 * 24 * 60 * 60);
        // optional properties
        cookie.setSecure(true);
        cookie.setHttpOnly(true);
        cookie.setPath("/");

        // add cookie to response
        response.addCookie(cookie);

        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication, TokenMapping tokenMapping) {

        Optional<String> redirectUri = CustomCookie.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME).map(Cookie::getValue);

        DefaultAssert.isAuthentication( !(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) );

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());

        Token token = Token.builder()
                .userEmail(tokenMapping.getUserEmail())
                .refreshToken(tokenMapping.getRefreshToken())
                .build();
        tokenRepository.save(token);

        UserDto user = userService.getUserByEmail(tokenMapping.getUserEmail());

        // 처음 로그인한 유저라면 queryParam에 key : REGISTER / value : REQUIRED 저장
        if(user.getRole().equals("REGISTER")){
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("token", tokenMapping.getAccessToken())
                    .queryParam("REGISTER", "REQUIRED")
                    .queryParam("email", user.getEmail())
                    .queryParam("userid", user.getUserId())
                    .build().encode().toUriString();
        }

        // 회원가입이 완료된 유저라면 quertParam에 key : REGISTER / value : DONE 저장
        return UriComponentsBuilder.fromUriString(targetUrl)
                .queryParam("token", tokenMapping.getAccessToken())
                .queryParam("REGISTER", "DONE")
                .queryParam("email", user.getEmail())
                .queryParam("userid", user.getUserId())
                .build().encode().toUriString();
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        customAuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return oAuth2Config.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}