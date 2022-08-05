package com.ssafy.jiguhero.oauthlogin.service.user;

import java.util.Optional;

import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.UserRepository;
import com.ssafy.jiguhero.oauthlogin.advice.assertThat.DefaultAssert;
import com.ssafy.jiguhero.oauthlogin.config.security.token.UserPrincipal;
import com.ssafy.jiguhero.oauthlogin.payload.response.ApiResponse;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;

    public ResponseEntity<?> readByUser(UserPrincipal userPrincipal){
        Optional<User> user = userRepository.findById(userPrincipal.getId());
        DefaultAssert.isOptionalPresent(user);
        ApiResponse apiResponse = ApiResponse.builder().check(true).information(user.get()).build();
        return ResponseEntity.ok(apiResponse);
    }


}
