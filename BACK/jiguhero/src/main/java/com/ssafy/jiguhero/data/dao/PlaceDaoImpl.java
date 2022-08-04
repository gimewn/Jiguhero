package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.Conn_Ground;
import com.ssafy.jiguhero.data.entity.Ground;
import com.ssafy.jiguhero.data.entity.Place;
import com.ssafy.jiguhero.data.entity.Review;
import com.ssafy.jiguhero.data.repository.ConnGroundRepository;
import com.ssafy.jiguhero.data.repository.PlaceRepository;
import com.ssafy.jiguhero.data.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlaceDaoImpl implements PlaceDao{
    private final ConnGroundRepository connGroundRepository;
    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;

    @Autowired
    public PlaceDaoImpl(ConnGroundRepository connGroundRepository, PlaceRepository placeRepository, ReviewRepository reviewRepository){
        this.connGroundRepository = connGroundRepository;
        this.placeRepository = placeRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Conn_Ground> selectJoinPlaceByGround(Ground groundEntity) {
        List<Conn_Ground> selectedJoinPlace = connGroundRepository.findAllByGround(groundEntity);
        return selectedJoinPlace;
    }

    @Override
    public Place selectPlaceById(Long placeId) {
        Place selected = placeRepository.getById(placeId);
        return selected;
    }

    @Override
    public List<Review> selectJoinReviewByPlace(Place placeEntity) {
        List<Review> selectedJoinReview = reviewRepository.findAllByPlace(placeEntity);
        return selectedJoinReview;
    }
}
