package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.*;

import java.util.List;

public interface PlaceDao {
    List<Conn_Ground> selectJoinPlaceByGround(Ground groundEntity);

    Place selectPlaceById(Long placeId);

    List<Review> selectJoinReviewByPlace(Place placeEntity);

    void insertReview(Review review);

    void insertReport(Report report);
}
