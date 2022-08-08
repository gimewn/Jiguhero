package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.*;
import com.ssafy.jiguhero.data.repository.ImageMissionRepository;
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
    private final ImageMissionRepository imageMissionRepository;

    @Autowired
    public ImageDaoImpl(ImageUserRepository imageUserRepository, ImagePlaceRepository imagePlaceRepository, ImageMissionRepository imageMissionRepository) {
        this.imageUserRepository = imageUserRepository;
        this.imagePlaceRepository = imagePlaceRepository;
        this.imageMissionRepository = imageMissionRepository;
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

    @Override
    public Image_Mission insertImageMission(Image_Mission imageMission) {
        Image_Mission savedImageMission = imageMissionRepository.save(imageMission);

        return savedImageMission;
    }

    @Override
    public List<Image_Mission> selectImageMissions(Mission mission) {
        List<Image_Mission> selectedImageMissions = imageMissionRepository.findAllByMission(mission);

        return selectedImageMissions;
    }


}
