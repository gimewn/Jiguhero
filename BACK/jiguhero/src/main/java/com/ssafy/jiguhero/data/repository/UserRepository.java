package com.ssafy.jiguhero.data.repository;

import com.ssafy.jiguhero.data.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // 유저 정보 가져오기 -> 기본 메서드 findById 사용
//    User findByUserId(Long userId);

    Optional<User> findByEmail(String email);
    Boolean existsByEmail(String email);

    User getByEmail(String email);

    Boolean existsByNickname(String nickname);
}
