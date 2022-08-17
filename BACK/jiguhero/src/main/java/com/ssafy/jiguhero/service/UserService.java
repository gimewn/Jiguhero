package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.UserDto;

import javax.servlet.http.HttpServletRequest;

public interface UserService {

    UserDto getUserById(Long userId);

    String getProfileImageURL(Long userId, HttpServletRequest request);

    UserDto getUserByEmail(String email);

    Integer checkNicknameDupl(String nickname);

    UserDto changeUserNickname(Long userId, String nickname) throws Exception;

    UserDto deleteUser(Long userId) throws Exception;

    void deleteToken(String userEmail) throws Exception;

}
