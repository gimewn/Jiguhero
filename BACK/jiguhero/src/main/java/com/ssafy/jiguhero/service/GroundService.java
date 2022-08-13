package com.ssafy.jiguhero.service;

import com.ssafy.jiguhero.data.dto.GroundDto;
import com.ssafy.jiguhero.data.dto.PlaceDto;

import java.util.List;

public interface GroundService {

    List<GroundDto> getTop5HitsLikes();

    List<GroundDto> getLikeGrounds(Long userId);

    List<GroundDto> getGrounds();

    GroundDto getGround(Long groundId);

    List<GroundDto> getGroundsByUser(Long userId);

    void saveGround(GroundDto groundDto, Long userId);

    boolean addGround(String placeId, Long groundId, Long userId);

    String deletePlace(String placeId, Long groundId, Long userId);

    String deleteGround(Long groundId, Long userId);

    List<PlaceDto> getPlacesByGround(Long groundId);

    boolean likeGround(Long groundId, Long userId);

    boolean getLikeGround(Long groundId, Long userId);

    void modifyGround(GroundDto groundDto, Long userId, Long groundId);
}
