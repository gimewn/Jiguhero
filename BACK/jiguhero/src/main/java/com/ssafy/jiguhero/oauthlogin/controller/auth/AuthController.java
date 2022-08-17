package com.ssafy.jiguhero.oauthlogin.controller.auth;


import javax.validation.Valid;

import com.ssafy.jiguhero.oauthlogin.config.security.token.CurrentUser;
import com.ssafy.jiguhero.oauthlogin.config.security.token.UserPrincipal;
import com.ssafy.jiguhero.oauthlogin.payload.request.auth.ChangePasswordRequest;
import com.ssafy.jiguhero.oauthlogin.payload.request.auth.SignInRequest;
import com.ssafy.jiguhero.oauthlogin.payload.request.auth.SignUpRequest;
import com.ssafy.jiguhero.oauthlogin.service.auth.AuthService;
import com.ssafy.jiguhero.oauthlogin.payload.request.auth.RefreshTokenRequest;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    @GetMapping(value = "/")
    public ResponseEntity<?> whoAmI(
        @CurrentUser UserPrincipal userPrincipal
    ) {
        return authService.whoAmI(userPrincipal);
    }


    @DeleteMapping(value = "/")
    public ResponseEntity<?> delete(
        @CurrentUser UserPrincipal userPrincipal
    ){
        return authService.delete(userPrincipal);
    }


    @PutMapping(value = "/")
    public ResponseEntity<?> modify(
            @CurrentUser UserPrincipal userPrincipal,
            @Valid @RequestBody ChangePasswordRequest passwordChangeRequest
            ){
        return authService.modify(userPrincipal, passwordChangeRequest);
    }


    @PostMapping(value = "/signin")
    public ResponseEntity<?> signin(
        @Valid @RequestBody SignInRequest signInRequest
    ) {
        return authService.signin(signInRequest);
    }


    @PostMapping(value = "/signup")
    public ResponseEntity<?> signup(
        @Valid @RequestBody SignUpRequest signUpRequest
    ) {
        return authService.signup(signUpRequest);
    }


    @PostMapping(value = "/refresh")
    public ResponseEntity<?> refresh(
        @Valid @RequestBody RefreshTokenRequest tokenRefreshRequest
    ) {
        return authService.refresh(tokenRefreshRequest);
    }



    @PostMapping(value="/signout")
    public ResponseEntity<?> signout(
        @CurrentUser UserPrincipal userPrincipal,
        @Valid @RequestBody RefreshTokenRequest tokenRefreshRequest
    ) {
        return authService.signout(tokenRefreshRequest);
    }

}
