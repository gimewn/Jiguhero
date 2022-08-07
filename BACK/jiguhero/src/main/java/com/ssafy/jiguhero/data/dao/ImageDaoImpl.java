package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Image_Place;
import com.ssafy.jiguhero.data.entity.Image_User;
import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.data.entity.User;
import com.ssafy.jiguhero.data.repository.ImagePlaceRepository;
import com.ssafy.jiguhero.data.repository.ImageUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class ImageDaoImpl implements ImageDao{

    private final ImageUserRepository imageUserRepository;
    private final ImagePlaceRepository imagePlaceRepository;

    @Autowired
    public ImageDaoImpl(ImageUserRepository imageUserRepository, ImagePlaceRepository imagePlaceRepository) {
        this.imageUserRepository = imageUserRepository;
        this.imagePlaceRepository = imagePlaceRepository;
    }

    @Override
    public Image_User insertImageUser(Image_User imageUser) {
        Image_User savedImageUser = imageUserRepository.save(imageUser);

        return savedImageUser;
    }

    @Override
    public Image_User selectImageUser(User user) {
        Optional<Image_User> selectedImageUser = imageUserRepository.findByUser(user);

        if (selectedImageUser.isPresent()) return selectedImageUser.get();
        else return null;
    }

    @Override
    public void deleteImageUser(User user) throws Exception {
        Optional<Image_User> selectedImageUser = imageUserRepository.findByUser(user);

        if (selectedImageUser.isPresent()) {
            imageUserRepository.delete(selectedImageUser.get());
        }
        else {
            throw new Exception();
        }
    }

    @Override
    public Image_Place insertImagePlace(Image_Place imagePlace) {
        Image_Place savedImagePlace = imagePlaceRepository.save(imagePlace);

        return savedImagePlace;
    }

    @Override
    public List<Image_Place> selectImagePlaces(Place place) {
        List<Image_Place> selectedImagePlaces = imagePlaceRepository.findAllByPlace(place);

        return selectedImagePlaces;
    }


}
