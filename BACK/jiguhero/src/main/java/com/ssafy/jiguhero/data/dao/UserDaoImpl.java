package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.UserRepository;
import com.ssafy.jiguhero.oauthlogin.domain.entity.user.Role;
import com.ssafy.jiguhero.oauthlogin.repository.auth.TokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Component
public class UserDaoImpl implements UserDao {

    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;

    @Autowired
    public UserDaoImpl(UserRepository userRepository, TokenRepository tokenRepository) {
        this.userRepository = userRepository;
        this.tokenRepository = tokenRepository;
    }

    @Override
    public User selectUserById(Long userId) {
        User selectedUser = userRepository.getById(userId);

        return selectedUser;
    }

    @Override
    public User selectUserByEmail(String email) {
        User selectUser = userRepository.getByEmail(email);

        return selectUser;
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
            user.setRole(Role.USER);
            user.setPoint(2000);
            updatedUser = userRepository.save(user);
        }
        else {
            throw new Exception();
        }

        return updatedUser;
    }

    @Override
    @Transactional
    public User deleteUser(Long userId) throws Exception {
        Optional<User> selectedUser = userRepository.findById(userId);
        User deletedUser;

        if (selectedUser.isPresent()) {
            User user = selectedUser.get();
            user.setEmail(null);
            user.setEmailVerified(null);
            user.setGrade(0);
            user.setName(null);
            user.setNickname("존재하지 않는 대원");
            user.setPassword(null);
            user.setPoint(0);
            user.setProvider(null);
            user.setRole(Role.DELETED);
            deletedUser = userRepository.save(user);
        }
        else {
            throw new Exception();
        }

        return deletedUser;
    }

    @Override
    public void deleteToken(String userEmail) throws Exception {
        tokenRepository.deleteById(userEmail);
    }

    @Override
    public void updatePoint(User user) {
        userRepository.save(user);
    }

    @Override
    public void updateUser(User user) {
        userRepository.save(user);
    }

    @Override
    public List<User> selectAllUser() {
        return userRepository.findAll();
    }
}
