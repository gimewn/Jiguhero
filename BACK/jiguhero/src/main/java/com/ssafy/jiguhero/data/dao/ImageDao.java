package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.*;

import java.util.List;
import java.util.Optional;

public interface ImageDao {

    Image_User insertImageUser(Image_User imageUser);

    Image_User selectImageUser(User user);

    void deleteImageUser(User user) throws Exception;

    Image_Place insertImagePlace(Image_Place imagePlace);

    List<Image_Place> selectImagePlaces(Place place);

    Image_Mission insertImageMission(Image_Mission imageMission);

    Image_Mission selectImageMissionById(Long imageId);

    // 대표 이미지 반환
    Image_Mission selectRepImageMission(Mission mission);

    List<Image_Mission> selectImageMissions(Mission mission);

    // 인증샷 이미지 반환
    List<Image_Mission> selectFeedImageMissions(Mission mission);

    void deleteImageMission(Image_Mission imageMission) throws Exception;

    Image_Promotion insertImagePromotion(Image_Promotion imagePromotion);

    Image_Promotion selectImagePromotion(Promotion promotion);

    void deleteImagePromotion(Image_Promotion imagePromotion) throws Exception;

    List<Optional<Image_Mission>> selectImageMissionByUserAndMission(User selectUserById, Mission selectMissionById);
}
