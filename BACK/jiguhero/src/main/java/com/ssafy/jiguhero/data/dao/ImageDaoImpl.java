package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Image_User;
import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.ImageUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ImageDaoImpl implements ImageDao{

    private final ImageUserRepository imageUserRepository;

    @Autowired
    public ImageDaoImpl(ImageUserRepository imageUserRepository) {
        this.imageUserRepository = imageUserRepository;
    }

    @Override
    public Image_User insertImageUser(Image_User imageUser) {
        Image_User savedImageUser = imageUserRepository.save(imageUser);

        return savedImageUser;
    }

    @Override
    public Image_User selectImageUser(User user) {
        Image_User selectedImageUser = imageUserRepository.findByUser(user);

        return selectedImageUser;
    }
}
