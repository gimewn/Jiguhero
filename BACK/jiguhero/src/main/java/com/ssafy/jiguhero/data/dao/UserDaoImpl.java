package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDaoImpl implements UserDao {

    private final UserRepository userRepository;

    @Autowired
    public UserDaoImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User selectUserById(Long userId) {
        User selectedUser = userRepository.getById(userId);

        return selectedUser;
    }
}
