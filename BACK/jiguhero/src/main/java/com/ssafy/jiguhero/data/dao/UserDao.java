package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.User;

public interface UserDao {

    // user_id로 유저 정보 가져오기
    User selectUserById(Long userId);

    User selectUserByEmail(String email);
}
