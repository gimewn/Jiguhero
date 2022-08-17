package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.*;
import com.ssafy.jiguhero.data.repository.ImageMissionRepository;
import com.ssafy.jiguhero.data.repository.ImagePlaceRepository;
import com.ssafy.jiguhero.data.repository.ImagePromotionRepository;
import com.ssafy.jiguhero.data.repository.ImageUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Component
public class ImageDaoImpl implements ImageDao{

    private final ImageUserRepository imageUserRepository;
    private final ImagePlaceRepository imagePlaceRepository;
    private final ImageMissionRepository imageMissionRepository;
    private final ImagePromotionRepository imagePromotionRepository;

    @Autowired
    public ImageDaoImpl(ImageUserRepository imageUserRepository, ImagePlaceRepository imagePlaceRepository, ImageMissionRepository imageMissionRepository, ImagePromotionRepository imagePromotionRepository) {
        this.imageUserRepository = imageUserRepository;
        this.imagePlaceRepository = imagePlaceRepository;
        this.imageMissionRepository = imageMissionRepository;
        this.imagePromotionRepository = imagePromotionRepository;
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
    public Image_Mission selectImageMissionById(Long imageId) {
        Image_Mission selectedImageMission = imageMissionRepository.getById(imageId);

        return selectedImageMission;
    }

    @Override
    public Image_Mission selectRepImageMission(Mission mission) {
        Optional<Image_Mission> selectedImageMission = imageMissionRepository.findByMissionAndRep(mission, true);

        if (selectedImageMission.isPresent()) return selectedImageMission.get();
        else return null;
    }

    @Override
    public List<Image_Mission> selectImageMissions(Mission mission) {
        List<Image_Mission> selectedImageMissions = imageMissionRepository.findAllByMission(mission);

        return selectedImageMissions;
    }

    @Override
    public List<Image_Mission> selectFeedImageMissions(Mission mission) {
        List<Image_Mission> selectedImageMissions = imageMissionRepository.findAllByMissionAndRep(mission, false);

        return selectedImageMissions;
    }

    @Override
    public void deleteImageMission(Image_Mission imageMission) throws Exception {
        imageMissionRepository.delete(imageMission);
    }

    @Override
    public Image_Promotion insertImagePromotion(Image_Promotion imagePromotion) {
        Image_Promotion savedImagePromotion = imagePromotionRepository.save(imagePromotion);

        return savedImagePromotion;
    }

    @Override
    public Image_Promotion selectImagePromotion(Promotion promotion) {
        Optional<Image_Promotion> selectedImagePromotion = imagePromotionRepository.findByPromotion(promotion);

        if (selectedImagePromotion.isPresent()) return selectedImagePromotion.get();
        else return null;
    }

    @Override
    public void deleteImagePromotion(Image_Promotion imagePromotion) throws Exception {
        imagePromotionRepository.delete(imagePromotion);
    }

    @Override
    public List<Optional<Image_Mission>> selectImageMissionByUserAndMission(User user, Mission mission) {
        return imageMissionRepository.findByUserAndMission(user, mission);
    }


}
