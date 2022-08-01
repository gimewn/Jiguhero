package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.UserDto;
import com.ssafy.jiguhero.data.entity.Image_User;
import com.ssafy.jiguhero.data.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class UserServiceImpl implements UserService {

    private final UserDao userDao;
    private final ImageDao imageDao;

    @Autowired
    public UserServiceImpl(UserDao userDao, ImageDao imageDao) {
        this.userDao = userDao;
        this.imageDao = imageDao;
    }

    @Override
    public UserDto getUserById(Long userId) {
        User entity = userDao.selectUserById(userId);

        UserDto dto = UserDto.of(entity);

        return dto;
    }

    @Override
    public String getProfileImageURL(Long userId, HttpServletRequest request) {
        User user = userDao.selectUserById(userId);
        Image_User imageUser = imageDao.selectImageUser(user);

        String saveFile = imageUser.getSaveFile();
        String saveFolder = imageUser.getSaveFolder();
        String sep = saveFolder.substring(0,1);
        String target = saveFolder.split(sep)[1];
        String date = saveFolder.split(sep)[2];
        String url = request.getRequestURL().toString().replace(request.getRequestURI(),"") + "/image/" + saveFile + "?target=" + target + "&date=" + date;

        return url;
    }
}
