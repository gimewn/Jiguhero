package com.ssafy.jiguhero.oauthlogin.repository.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

import com.ssafy.jiguhero.oauthlogin.domain.entity.user.Token;

@Repository
public interface TokenRepository extends JpaRepository<Token, String> {
    Optional<Token> findByUserEmail(String userEmail);
    Optional<Token> findByRefreshToken(String refreshToken);
}