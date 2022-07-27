package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.UserDto;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    public UserDto getUserById(Long userId) {
        User entity = userDao.selectUserById(userId);

        UserDto dto = UserDto.of(entity);

        return dto;
    }
}
