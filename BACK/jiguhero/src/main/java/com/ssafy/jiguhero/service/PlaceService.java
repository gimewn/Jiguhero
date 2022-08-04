package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.PlaceDto;
import com.ssafy.jiguhero.data.dto.ReviewDto;

import java.util.List;

public interface PlaceService {
    List<PlaceDto> getPlaces(Long groundId);

    PlaceDto getPlace(Long placeId);

    List<ReviewDto> getReviews(Long placeId);

    void saveReview(String content, int score, Long placeId, Long userId);
}
