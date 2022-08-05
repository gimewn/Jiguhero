package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

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

    @Override
    public Boolean existsByNickname(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    @Override
    @Transactional
    public User updateUserNickname(Long userId, String nickname) throws Exception {
        Optional<User> selectedUser = userRepository.findById(userId);
        User updatedUser;

        if (selectedUser.isPresent()) {
            User user = selectedUser.get();
            user.setNickname(nickname);
            updatedUser = userRepository.save(user);
        }
        else {
            throw new Exception();
        }

        return updatedUser;
    }
}
