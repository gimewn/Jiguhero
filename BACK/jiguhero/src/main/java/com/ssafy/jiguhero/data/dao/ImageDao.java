package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Image_Place;
import com.ssafy.jiguhero.data.entity.Image_User;
import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.data.entity.User;

import java.util.List;

public interface ImageDao {

    Image_User insertImageUser(Image_User imageUser);

    Image_User selectImageUser(User user);

    void deleteImageUser(User user) throws Exception;

    Image_Place insertImagePlace(Image_Place imagePlace);

    List<Image_Place> selectImagePlaces(Place place);

}
