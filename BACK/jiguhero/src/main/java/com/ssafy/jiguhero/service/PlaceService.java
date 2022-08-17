package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.dto.ReportDto;
import com.ssafy.jiguhero.data.dto.ReviewDto;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

public interface PlaceService {
    List<PlaceDto> getPlaces(Long groundId);

    PlaceDto getPlace(String placeId, HttpServletRequest request);

    List<ReviewDto> getReviews(String placeId);

    void saveReview(ReviewDto review, String placeId, Long userId);

    void saveReport(ReportDto reportDto, String placeId, Long userId);

    void deleteReview(Long reviewId);

    List<String> getPlaceImageURL(String placeId, HttpServletRequest request);

    void savePlace(PlaceDto placeDto);
}
