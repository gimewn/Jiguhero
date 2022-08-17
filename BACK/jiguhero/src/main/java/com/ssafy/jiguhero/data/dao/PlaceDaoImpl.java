package com.ssafy.jiguhero.data.dao;

import com.ssafy.jiguhero.data.entity.*;
import com.ssafy.jiguhero.data.repository.ConnGroundRepository;
import com.ssafy.jiguhero.data.repository.PlaceRepository;
import com.ssafy.jiguhero.data.repository.ReportRepository;
import com.ssafy.jiguhero.data.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PlaceDaoImpl implements PlaceDao{
    private final ConnGroundRepository connGroundRepository;
    private final PlaceRepository placeRepository;
    private final ReviewRepository reviewRepository;
    private final ReportRepository reportRepository;

    @Autowired
    public PlaceDaoImpl(ConnGroundRepository connGroundRepository, PlaceRepository placeRepository,
                        ReviewRepository reviewRepository, ReportRepository reportRepository){
        this.connGroundRepository = connGroundRepository;
        this.placeRepository = placeRepository;
        this.reviewRepository = reviewRepository;
        this.reportRepository = reportRepository;
    }

    @Override
    public List<Conn_Ground> selectJoinPlaceByGround(Ground groundEntity) {
        List<Conn_Ground> selectedJoinPlace = connGroundRepository.findAllByGround(groundEntity);
        return selectedJoinPlace;
    }

    @Override
    public Place selectPlaceById(String placeId) {
        Place selected = placeRepository.getById(placeId);
        return selected;
    }

    @Override
    public List<Review> selectJoinReviewByPlace(Place placeEntity) {
        List<Review> selectedJoinReview = reviewRepository.findAllByPlace(placeEntity);
        return selectedJoinReview;
    }

    @Override
    public void insertReview(Review review) {
        reviewRepository.save(review);
    }

    @Override
    public void insertReport(Report report) {
        reportRepository.save(report);
    }

    @Override
    public List<Place> selectAll() {
        List<Place> selectedPlaces = placeRepository.findAll();
        return selectedPlaces;
    }

    @Override
    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }

    @Override
    public void savePlace(Place placeEntity) {
        placeRepository.save(placeEntity);
    }
}
