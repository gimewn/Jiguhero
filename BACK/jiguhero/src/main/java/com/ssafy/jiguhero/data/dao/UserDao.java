package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.User;

import java.util.List;

public interface UserDao {

    // user_id로 유저 정보 가져오기
    User selectUserById(Long userId);

    User selectUserByEmail(String email);

    // 닉네임의 중복 여부 확인하기
    Boolean existsByNickname(String nickname);

    // 유저의 nickname 수정하기
    User updateUserNickname(Long userId, String nickname) throws Exception;

    User deleteUser(Long userId) throws Exception;

    void deleteToken(String userEmail) throws Exception;

    void updatePoint(User user);

    void updateUser(User user);

    List<User> selectAllUser();
}
