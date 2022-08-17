package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.*;

import java.util.List;

public interface PlaceDao {
    List<Conn_Ground> selectJoinPlaceByGround(Ground groundEntity);

    Place selectPlaceById(String placeId);

    List<Review> selectJoinReviewByPlace(Place placeEntity);

    void insertReview(Review review);

    void insertReport(Report report);

    // 모든 친환경 가게 가져오기
    List<Place> selectAll();

    void deleteReview(Long reviewId);

    void savePlace(Place placeEntity);
}
