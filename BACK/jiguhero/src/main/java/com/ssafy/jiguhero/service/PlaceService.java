package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.PlaceDto;

import java.util.List;

public interface PlaceService {
    List<PlaceDto> getPlaces(Long groundId);

    PlaceDto getPlace(Long placeId);
}
