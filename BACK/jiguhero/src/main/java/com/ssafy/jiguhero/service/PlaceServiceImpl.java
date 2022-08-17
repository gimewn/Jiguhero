package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dao.GroundDao;
import com.ssafy.jiguhero.data.dao.ImageDao;
import com.ssafy.jiguhero.data.dao.PlaceDao;
import com.ssafy.jiguhero.data.dao.UserDao;
import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.dto.ReportDto;
import com.ssafy.jiguhero.data.dto.ReviewDto;
import com.ssafy.jiguhero.data.entity.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlaceServiceImpl implements PlaceService{
    private final GroundDao groundDao;
    private final PlaceDao placeDao;
    private final UserDao userDao;
    private final ImageDao imageDao;

    public PlaceServiceImpl(GroundDao groundDao, PlaceDao placeDao, UserDao userDao, ImageDao imageDao) {
        this.groundDao = groundDao;
        this.placeDao = placeDao;
        this.userDao = userDao;
        this.imageDao = imageDao;
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
    public PlaceDto getPlace(String placeId, HttpServletRequest request) {
        Place entity = placeDao.selectPlaceById(placeId);
        PlaceDto dto = PlaceDto.of(entity);
        dto.setImageURL(getPlaceImageURL(placeId, request));
        // 등록된 이미지 URL 가져오기
        return dto;
    }

    @Override
    @Transactional
    public List<String> getPlaceImageURL(String placeId, HttpServletRequest request) {
        List<Image_Place> imagePlaces = imageDao.selectImagePlaces(placeDao.selectPlaceById(placeId));
        List<String> urlList = new ArrayList<>();

        for (Image_Place imagePlace : imagePlaces) {
            String saveFile = imagePlace.getSaveFile();
            String saveFolder = imagePlace.getSaveFolder();
            String sep = saveFolder.substring(0,1);
            if (sep.equals("\\")) sep = "\\\\";
            String target = saveFolder.split(sep)[1];
            String date = saveFolder.   split(sep)[2];
            String url = request.getRequestURL().toString().replace(request.getRequestURI(),"") + "/image/" + saveFile + "?target=" + target + "&date=" + date;

            urlList.add(url);
        }

        return urlList;
    }

    @Override
    @Transactional
    public void savePlace(PlaceDto placeDto) {
        Place placeEntity = Place.of(placeDto);
        placeDao.savePlace(placeEntity);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReviewDto> getReviews(String placeId) {
        Place placeEntity = placeDao.selectPlaceById(placeId);
        List<Review> joinReviewList = placeDao.selectJoinReviewByPlace(placeEntity);
        List<ReviewDto> dtoList = joinReviewList.stream().map(entity -> ReviewDto.of(entity)).collect(Collectors.toList());
        return dtoList;
    }

    @Override
    @Transactional
    public void saveReview(ReviewDto review, String placeId, Long userId) {
        Review reviewEntity = Review.of(review);
        Place placeEntity = placeDao.selectPlaceById(placeId);
        User userEntity = userDao.selectUserById(userId);
        reviewEntity.setPlace(placeEntity);
        reviewEntity.setUser(userEntity);
        placeDao.insertReview(reviewEntity);
    }

    @Override
    @Transactional
    public void saveReport(ReportDto report, String placeId, Long userId) {
        Report reportEntity = Report.of(report);
        Place placeEntity = placeDao.selectPlaceById(placeId);
        User userEntity = userDao.selectUserById(userId);
        reportEntity.setPlace(placeEntity);
        reportEntity.setUser(userEntity);
        placeDao.insertReport(reportEntity);
    }

    @Override
    @Transactional
    public void deleteReview(Long reviewId) {
        placeDao.deleteReview(reviewId);
    }
}
