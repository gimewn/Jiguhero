package com.ssafy.jiguhero.oauthlogin.api.service;

import com.ssafy.jiguhero.oauthlogin.api.entity.user.User;
import com.ssafy.jiguhero.oauthlogin.api.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String userId) {
        return userRepository.findByUserId(userId);
    }
}
