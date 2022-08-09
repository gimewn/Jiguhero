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

    void saveGround(GroundDto groundDto, List<PlaceDto> placeDtoList, Long userId);
}
