package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.GroundDao;
import com.ssafy.jiguhero.data.dao.PlaceDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.dto.ReviewDto;
import com.ssafy.jiguhero.data.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceServiceImpl implements PlaceService{
    private final GroundDao groundDao;
    private final PlaceDao placeDao;
    private final UserDao userDao;

    public PlaceServiceImpl(GroundDao groundDao, PlaceDao placeDao, UserDao userDao) {
        this.groundDao = groundDao;
        this.placeDao = placeDao;
        this.userDao = userDao;
    }


    @Override
    @Transactional(readOnly = true)
    public List<PlaceDto> getPlaces(Long groundId) {
        Ground groundEntity = groundDao.selectGroundById(groundId);
        List<Conn_Ground> joinPlaceList = placeDao.selectJoinPlaceByGround(groundEntity);
        List<Place> entityList = new ArrayList<>();

        for(Conn_Ground joinPlace : joinPlaceList){
            entityList.add(joinPlace.getPlace());
        }

        List<PlaceDto> dtoList = entityList.stream().map(entity -> PlaceDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    @Transactional(readOnly = true)
    public PlaceDto getPlace(Long placeId) {
        Place entity = placeDao.selectPlaceById(placeId);
        PlaceDto dto = PlaceDto.of(entity);
        return dto;
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDto> getReviews(Long placeId) {
        Place placeEntity = placeDao.selectPlaceById(placeId);
        List<Review> joinReviewList = placeDao.selectJoinReviewByPlace(placeEntity);

        List<ReviewDto> dtoList = joinReviewList.stream().map(entity -> ReviewDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    public void saveReview(String content, int score, Long placeId, Long userId) {
        Review review = new Review();
        Place placeEntity = placeDao.selectPlaceById(placeId);
        User userEntity = userDao.selectUserById(userId);
        review.setContent(content);
        review.setScore(score);
        review.setPlace(placeEntity);
        review.setUser(userEntity);
        placeDao.insertReview(review);
    }

    @Override
    public void saveReport(String content, int category, Long placeId, Long userId) {
        Report report = new Report();
        Place placeEntity = placeDao.selectPlaceById(placeId);
        User userEntity = userDao.selectUserById(userId);
        report.setContent(content);
        report.setCategory(category);
        report.setPlace(placeEntity);
        report.setUser(userEntity);
        placeDao.insertReport(report);
    }
}
